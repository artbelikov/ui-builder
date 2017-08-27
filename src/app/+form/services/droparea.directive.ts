import {
    Directive,
    HostListener
} from '@angular/core';

@Directive({
    selector: '[appDroparea]'
})
export class DropareaDirective {
    public isDragover

    constructor() {
    }


    @HostListener('dragenter', ["$event"])
    dragenter(event) {
        event.dataTransfer.dropEffect = 'move';
    }

    @HostListener('dragover', ["$event"])
    dragover(event) {
        event.preventDefault();
        this.isDragover = true;
        event.dataTransfer.dropEffect = 'move'
    }

    @HostListener('dragleave', ["$event"])
    dragleave(event) {
        this.isDragover = false
    }
}
