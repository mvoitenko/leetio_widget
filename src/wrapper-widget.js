import React from "react";
import ReactDOM from 'react-dom';
import LeetioWidget from "./components/leetio-widget";
console.log('trying to mount')

class WrapperWidget {

    static widgetElement;

    static mount() {
        console.log('trying to mount')
        const leetioWidget = <LeetioWidget />


        function doRender () {
            if (WrapperWidget.widgetElement) {
                throw new Error('WrapperWidget is already mounted, unmount it first');
            }

            const el = document.createElement('div');

            document.body.appendChild(el);

            ReactDOM.render(leetioWidget, el);
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


