import React from "react";
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import LeetioWidget from "./components/leetio-widget";

class WrapperWidget {

    static widgetElement;

    static mount() {
        const leetioWidget = <LeetioWidget />

        function doRender () {

            if (WrapperWidget.widgetElement) {
                throw new Error('WrapperWidget is already mounted, unmount it first');
            }

            const el = document.createElement('div');
            el.id= 'leetio_wrapper'
            document.body.appendChild(el);
            const root = createRoot(el);
            root.render(leetioWidget);
            WrapperWidget.widgetElement = el;
        }


        if (document.readyState === 'complete') {
            doRender();
        } else {
            window.addEventListener('load', () => {
                doRender();
            });
        }
    }

    static unmount() {
        if (!WrapperWidget.widgetElement) {
            throw new Error('WrapperWidget isn\'t mounted, mount it first');
        }
        ReactDOM.unmountComponentAtNode(WrapperWidget.widgetElement);
        WrapperWidget.el.parentNode.removeChild(WrapperWidget.widgetElement);
        WrapperWidget.el = null;
    }
}


export default WrapperWidget;


