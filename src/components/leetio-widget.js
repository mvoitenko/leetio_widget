import React, {useState} from "react";
import './leetio-widget.css';

function LeetioWidget() {


    const [isOpened, setIsOpened] = useState(false);

    const elementsMap = {};


    const createCounter = (initValue) => {
        return () => ++initValue;
    }

    const elementCounter = createCounter(0);

    const handleClick = (evt) => {
        if (isOpened) {
            const hostPageElement = elementsMap[evt.target.id];
            if (hostPageElement) {
                const originalBorder = hostPageElement?.style.border.toString();
                hostPageElement.style.border = 'dashed red';
                hostPageElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})

                setTimeout(() => {
                    hostPageElement.style.border = originalBorder;
                }, 3000)
            }
        }
    }

    const renderNode = (elObj) => {
        const elementGeneratedId = elementCounter();
        elementsMap[elementGeneratedId] = elObj;
        console.log(elObj.tagName, elObj.childElementCount)
        if (elObj.childElementCount < 1) {
            return (
                <li id={elementGeneratedId}>
                    Tagname: {elObj.tagName}
                </li>
            );
        }
        return (
            <>
                <ul id={elementGeneratedId}>
                    Tagname: {elObj.tagName}
                    {
                        [...elObj.children].map(child => {
                            return renderNode(child);
                        })
                    }
                </ul>
            </>
        );
    }


    const domTree = document.querySelector('html');


    return (
        <div
            className="docked-widget"
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
            {isOpened && renderNode(domTree)}
        </div>
    );
}

export default LeetioWidget;