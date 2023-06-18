import React from 'react';

export interface RefComponentModuleProps
    extends React.ComponentPropsWithRef<'section'> {}

const RefComponentModule = React.forwardRef<any, any>((props, ref) => {
    return (
        <section
            ref={ref}
            className={props.className ? props.className : ''}
            {...props}
        >
            {props.children}
        </section>
    );
});

RefComponentModule.displayName = 'RefComponentModule';

export default RefComponentModule;
