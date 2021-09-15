import './pic-viewer.less';
import {throttle} from "../../util";

export function initViewer(src) {
    const div = document.createElement('div');

    div.innerHTML = `
    <div class="pic-viewer">
        <a href="javascript:" class="pic-close">&times;</a>
        <div layout="row" layout-fill layout-align="center center" class="drag">
            <img src="${src}" class="pic-img" draggable="false">
        </div>
    </div>
    `;

    document.body.appendChild(div);

    addEvent(div);

    return function remove() {
        div && div.parentNode && div.parentNode.removeChild(div);
    }
}

function addEvent(div) {
    const closeBtn = div.querySelector('.pic-close');
    const picViewer = div.querySelector('.pic-viewer');
    const picImg = div.querySelector('.pic-img');
    const drag = div.querySelector('.drag');
    closeBtn.addEventListener('click', function () {
        document.body.removeChild(div);
    });
    picImg.scaleBase = 1;
    picViewer.addEventListener('mousewheel', function (e) {
        e.preventDefault();
        const scale = e.deltaY > 0 ? -0.05 : 0.05;
        picImg.scaleBase += scale;
        picImg.style.transform = `scale(${picImg.scaleBase})`
    });
    let canMove, current, matchX = 0, matchY = 0;
    picImg.addEventListener('mousedown', function (e) {
        canMove = true;
        current = e;
        const match = drag.style.transform.match(/-?\d+/g)
        if (match && match.length === 2) {
            matchX = parseFloat(match[0]);
            matchY = parseFloat(match[1]);
        }
    });
    picViewer.addEventListener('mouseup', function () {
        canMove = false;
    });
    picViewer.addEventListener('mousemove', throttle(function (e) {
        if (current && canMove) {
            const x = e.pageX - current.pageX + matchX;
            const y = e.pageY - current.pageY + matchY;
            drag.style.transform = `translateX(${x}px) translateY(${y}px)`;
        }
    }, 50));
}

