import React, { useEffect, useRef } from 'react';


type Props = {
    number: number,
    intervalTime: number,
    onChange: Function,
}

const SlideBar: React.FunctionComponent<Props> = (props): JSX.Element => {

    const container = useRef(null);


    useEffect(() => {
        if (!container.current) return;
        const containerDom: HTMLElement = container.current;
        const items: NodeListOf<HTMLElement> = containerDom.querySelectorAll('.slidebar-item .slidebar-timing');
        console.log(items)
        const intervalSeconds = Number((props.intervalTime / 1000).toFixed(0));
        const applyTransition = (element: HTMLElement, index: number): Promise<undefined> => {
            element.style.transition = `width ${intervalSeconds}s linear`
            element.style.width = "100%";
            if (index) props.onChange.call(null, index);
            return Promise.resolve(void 0)
        };
        const sleep = (index: number): Promise<undefined> => new Promise((resolve) => {
            setTimeout(() => {

                resolve(void 0)
            }, intervalSeconds * 1000)
        });

        let promiseChain = Promise.resolve(void 0)
        for (let i = 0; i < props.number; i++) {
            promiseChain = promiseChain.then(() => applyTransition(items[i], i)).then(() => sleep(i))
        }

    });
    return <div className='slidebar-container' ref={container}>
        {new Array(props.number).fill(0).map((val, index) => {
            return <div className='slidebar-item' key={index}>
                <div className='slidebar-timing'></div>
            </div>
        })}
    </div>;
}

export default SlideBar;
