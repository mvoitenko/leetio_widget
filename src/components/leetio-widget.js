import React, {Fragment, useState} from "react";
import './leetio-widget.css';
import {createCounter, highlightElement} from "../utils";
import config from '../config.json';

function LeetioWidget() {
    const [isOpened, setIsOpened] = useState(false);
    const counter = createCounter();
    const elementsMap = {};
    const highlightedList = new Set();
    const domTree = document.querySelector(config.target_selector);

    const handleClick = async (evt) => {
        if (isOpened) {
            const elementIdInWidget = evt.target.id;
            const hostPageElement = elementsMap[elementIdInWidget];
            if (hostPageElement && !highlightedList.has(elementIdInWidget)) {
                highlightedList.add(elementIdInWidget);
                await highlightElement(hostPageElement).finally(() => {
                    highlightedList.delete(elementIdInWidget);
                });
            }
        }
    }

    const renderNode = (elObj) => {
        if (config.widget_id === elObj.id) {
            return;
        }
        const elementGeneratedId = counter.getId();
        elementsMap[elementGeneratedId] = elObj;

        return (
            <Fragment key={elementGeneratedId}>
                <li
                    id={elementGeneratedId}
                    className="listElement"
                >
                    Tag: {elObj.tagName}
                </li>
                {
                    elObj.childElementCount > 0 &&
                    <ul>
                        {[...elObj.children].map(renderNode)}
                    </ul>
                }
            </Fragment>
        );
    }

    return (
        <div
            className="dockedWidget"
            onClick={handleClick}
            style={{backgroundColor: isOpened ? 'rgba(0,0,0,.5)' : ''}}
        >
            <button
                type="button"
                className={`dock ${isOpened ? 'close' : ''}`}
                onClick={() => setIsOpened((prevState) => !prevState)}
            >
                {isOpened ? 'Close' : 'View DOM'}
            </button>
            <div className="results">
                {isOpened && renderNode(domTree)}
            </div>
        </div>
    );
}

export default LeetioWidget;