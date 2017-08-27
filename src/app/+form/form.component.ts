import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
} from '@angular/core';
import {ElementsStackService} from "@app/+form/services/elements-stack.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'ui-form',
  templateUrl: './form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./form.component.scss']
})
export class UIFormComponent {
    private subscription;
    public elements;
    public formId;
    public selectedElement;

    constructor(private elementsStack: ElementsStackService,
                private ref: ChangeDetectorRef,
                private route: ActivatedRoute
                ){
        this.formId = _.get(this.route,'snapshot.params.id')
    }

    public ngOnInit(){
        this.subscription = this.elementsStack.stack$.subscribe((elements = []) => {
            console.warn(elements)
            this.elements = elements
            this.ref.markForCheck();
        }, (err) => {
            console.error(err);
        });
    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
