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
            console.log(evt.target.id, elementsMap);
            const hostPageElement = elementsMap[evt.target.id];
            console.log('clicking on', evt);
            hostPageElement.style.border = 'dashed red';

            console.log(elementsMap)

            setTimeout(() => {
                hostPageElement.style.border = '';
            }, 3000)
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
        <div className="docked-widget" onClick={handleClick}>
            { !isOpened &&
                <button
                    type="button"
                    className="dock"
                    onClick={() => setIsOpened((prevState) => !prevState)}
                >
                    View DOM
                </button>
            }

            {
                isOpened &&  renderNode(domTree)
            }

        </div>
    );
}

export default LeetioWidget;