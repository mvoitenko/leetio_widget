import config from './config.json';


export function createCounter() {
    return {
        id: 0,
        getId() {
            this.id = this.id + 1;
            return this.id;
        }
    };
}

export async function highlightElement(hostPageElement) {
    return new Promise(resolve => {
        const originalBorder = hostPageElement.style.border.toString()
        const originalBackground = hostPageElement.style.backgroundColor.toString()
        hostPageElement.style.border = config.highlight_style.border;
        hostPageElement.style.backgroundColor = config.highlight_style.backgroundColor;

        hostPageElement.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})

        setTimeout(() => {
            hostPageElement.style.border = originalBorder;
            hostPageElement.style.backgroundColor = originalBackground;
            resolve();
        }, 3000)
    });
}
