import React, {useState} from "react";
import './leetio-widget.css';

function LeetioWidget() {
    const [isOpened, setIsOpened] = useState(false);
    const elementsMap = {};
    const highlightedList = [];
    const domTree = document.querySelector('html');

    const createCounter = (initValue) => () => initValue++;
    const elementCounter = createCounter(0);

    const handleClick = (evt) => {
        if (isOpened) {
            const elementIdInWidget = evt.target.id;
            const hostPageElement = elementsMap[elementIdInWidget];
            if (hostPageElement && !highlightedList.includes(elementIdInWidget)) {
                highlightedList.push(evt.target.id);

                const originalBorder = hostPageElement.style.border.toString()
                const originalBackground = hostPageElement.style.backgroundColor.toString()
                hostPageElement.style.border = 'dashed red';
                hostPageElement.style.backgroundColor = 'coral';

                hostPageElement.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
                setTimeout(() => {
                    hostPageElement.style.border = originalBorder;
                    hostPageElement.style.backgroundColor = originalBackground;
                    highlightedList.splice(highlightedList.indexOf(elementIdInWidget),1);
                }, 3000)
            }
        }
    }

    const renderNode = (elObj) => {
        if (elObj.id === 'leetio_wrapper') {
            return;
        }
        const elementGeneratedId = elementCounter();
        elementsMap[elementGeneratedId] = elObj;

        return (
            <>
                <li
                    id={elementGeneratedId}
                    key={elementGeneratedId}
                    className="listElement"
                >
                    Tag: {elObj.tagName}
                </li>
                {
                    elObj.childElementCount > 0 &&
                    <ul>
                        {
                            [...elObj.children].map(child => {
                                return renderNode(child);
                            })
                        }
                    </ul>
                }
            </>
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