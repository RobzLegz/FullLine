import { Request, Response } from "express";
import prisma from "../../../src/lib/prisma";
import { getCoordsFromAddress } from "../../../src/utils/getCoordsFromAddress";
import { EventImage, Product, ProductCategory } from "@prisma/client";

export const spotCtrl = {
  getMapSpots: async (req: Request, res: Response) => {
    try {
      const { country } = req.params;

      const spots = await prisma.spot.findMany({
        where: {
          verified: true,
          city: {
            countryId: country,
          },
          location: {
            isNot: {
              lat: null,
              lng: null,
            },
          },
        },
        select: {
          cover: {
            select: {
              src: true,
            },
          },
          id: true,
          category_ids: true,
          priority: true,
          cityId: true,
          location: {
            select: {
              lat: true,
              lng: true,
            },
          },
        },
        take: 100,
        orderBy: {
          priority: "desc",
        },
      });

      res.json({ spots });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  clickWebsiteUrl: async (req: Request, res: Response) => {
    try {
      const { id: spotId } = req.params;

      if (!req.user_id) {
        return res.status(400).json({ err: "Unauthorized" });
      }

      await prisma.websiteVisit.create({
        data: { spotId, userId: req.user_id },
      });

      res.json({
        msg: "Pressed",
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const { id: spotId } = req.params;
      const { categories: includeCategories } = req.query;

      if (!req.user_id && !req.partner_id) {
        return res.status(400).json({ err: "Unauthorized" });
      }

      if (includeCategories && req.partner_id) {
        const spot = await prisma.spot.findFirst({
          where: {
            id: spotId,
          },
          include: {
            products: {
              include: {
                category: true,
              },
            },
            categories: true,
            product_categories: true,
          },
        });

        return res.json({
          msg: "Spot found",
          spot,
        });
      }

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 2);
      yesterday.setUTCHours(24, 59, 59, 99);

      let spot = await prisma.spot.findFirst({
        where: {
          id: spotId,
        },
        select: {
          id: true,
          cover: true,
          name: true,
          description: true,
          website_url: true,
          images: true,
          location: true,
          category_ids: true,
          categories: includeCategories ? true : false,
          products: true,
          spotloc_url: true,
          events: {
            where: {
              start_date: {
                gte: yesterday,
              },
              verified: true,
            },
            take: 14,
            orderBy: {
              start_date: "asc",
            },
          },
        },
      });

      if (!spot) {
        return res.status(404).json({ err: "Spot not found" });
      }

      spot = {
        ...spot,
        spotloc_url: spot.spotloc_url
          ? `https://spotloc.lv/pasakums/${spot.spotloc_url}`
          : null,
      };

      res.json({
        msg: "Spot found",
        spot,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  deleteOne: async (req: Request, res: Response) => {
    try {
      const { id: spotId } = req.params;
      if (!req.partner_id) {
        return res.status(400).json({ err: "Unauthorized" });
      }

      await prisma.spot.deleteMany({
        where: { id: spotId, partnerId: req.partner_id },
      });

      await prisma.product.deleteMany({
        where: { spotId: spotId },
      });

      await prisma.productCategory.deleteMany({
        where: { spotId: spotId },
      });

      res.json({
        msg: "Spot deleted",
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const { partner_id } = req;
      if (!partner_id) {
        return res.status(400).json({ err: "sesija beigusies" });
      }

      const {
        name,
        description,
        websiteUrl,
        cityId,
        address,
        countryId,
        categoryIds,
        phoneNumber,
        email,
        banner,
        images,
        cover,
        productCategories,
        products,
      }: {
        name: string;
        description: string;
        websiteUrl: string;
        cityId: string;
        address: string;
        countryId: string;
        categoryIds: string[];
        phoneNumber?: string;
        email?: string;
        banner?: EventImage;
        productCategories: ProductCategory[];
        cover: EventImage;
        images: EventImage[];
        products: Product[];
      } = req.body;

      const foundCity = await prisma.city.findFirst({
        where: { id: cityId, countryId },
      });
      if (!foundCity) {
        return res.status(400).json({ err: "City not found" });
      }

      const coords = await getCoordsFromAddress(
        `${address}, ${foundCity.name}`
      );
      if (!coords || !coords?.lat || !coords?.lng) {
        return res
          .status(500)
          .json({ err: "Failed to convert address to coordinates" });
      }

      const { lat, lng } = coords;

      const location = {
        address,
        city: foundCity.name,
        location: name,
        lat,
        lng,
        geo: {
          type: "Point",
          coordinates: [lng, lat],
        },
      };

      const spot = await prisma.spot.create({
        data: {
          name,
          description,
          website_url: websiteUrl,
          cityId,
          location,
          partnerId: partner_id,
          category_ids: categoryIds,
          phone_number: phoneNumber,
          priority:
            req.partner_id !== "64500e7039f2de1e158d1692" &&
            req.partner_id !== "6453c992171e6d69a0fd635e"
              ? 50
              : 0,
          email,
          banner,
          images,
          cover,
        },
      });

      if (!spot) {
        return res.status(500).json({ err: "Failed to create a spot" });
      }

      const whereProducts = products.map((p) => p.id);

      await prisma.product.updateMany({
        where: { id: { in: whereProducts } },
        data: {
          spotId: spot.id,
        },
      });

      const whereProductCategories = productCategories.map((p) => p.id);

      await prisma.productCategory.updateMany({
        where: { id: { in: whereProductCategories } },
        data: {
          spotId: spot.id,
        },
      });

      res.json({ msg: "Spot created", spot });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  updateOne: async (req: Request, res: Response) => {
    try {
      const { id: spotId } = req.params;
      if (!req.partner_id) {
        return res.status(400).json({ err: "sesija beigusies" });
      }

      const {
        name,
        description,
        websiteUrl,
        cityId,
        address,
        countryId,
        categoryIds,
        phoneNumber,
        email,
        productCategories,
        banner,
        images,
        cover,
        products,
      }: {
        name: string;
        description: string;
        websiteUrl: string;
        cityId: string;
        address: string;
        countryId: string;
        categoryIds: string[];
        phoneNumber?: string;
        email?: string;
        banner?: EventImage;
        cover: EventImage;
        images: EventImage[];
        productCategories: ProductCategory[];
        products: Product[];
      } = req.body;

      const foundCity = await prisma.city.findFirst({
        where: { id: cityId, countryId },
      });
      if (!foundCity) {
        return res.status(400).json({ err: "City not found" });
      }

      const coords = await getCoordsFromAddress(
        `${address}, ${foundCity.name}`
      );
      if (!coords || !coords?.lat || !coords?.lng) {
        return res
          .status(500)
          .json({ err: "Failed to convert address to coordinates" });
      }

      const { lat, lng } = coords;

      const location = {
        address,
        city: foundCity.name,
        location: name,
        lat,
        lng,
        geo: {
          type: "Point",
          coordinates: [lng, lat],
        },
      };

      const spot = await prisma.spot.update({
        where: {
          id: spotId,
        },
        data: {
          name,
          description,
          website_url: websiteUrl,
          cityId,
          location,
          category_ids: categoryIds,
          phone_number: phoneNumber,
          email,
          banner,
          images,
          cover,
        },
      });

      if (!spot) {
        return res.status(500).json({ err: "Failed to update a spot" });
      }

      const whereProducts = products.filter((p) => !p.spotId).map((p) => p.id);

      await prisma.product.updateMany({
        where: { id: { in: whereProducts } },
        data: {
          spotId: spot.id,
        },
      });

      const whereProductCategories = productCategories
        .filter((cat) => !cat.spotId)
        .map((cat) => cat.id);

      await prisma.productCategory.updateMany({
        where: { id: { in: whereProductCategories } },
        data: {
          spotId: spot.id,
        },
      });

      res.json({ msg: "Spot updated", spot });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
};
