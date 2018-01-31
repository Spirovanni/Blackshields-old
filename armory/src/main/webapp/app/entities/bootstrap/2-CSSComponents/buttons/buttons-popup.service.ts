import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Buttons } from './buttons.model';
import { ButtonsService } from './buttons.service';

@Injectable()
export class ButtonsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private buttonsService: ButtonsService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.buttonsService.find(id).subscribe((buttons) => {
                    if (buttons.date) {
                        buttons.date = {
                            year: buttons.date.getFullYear(),
                            month: buttons.date.getMonth() + 1,
                            day: buttons.date.getDate()
                        };
                    }
                    this.ngbModalRef = this.buttonsModalRef(component, buttons);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.buttonsModalRef(component, new Buttons());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    buttonsModalRef(component: Component, buttons: Buttons): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.buttons = buttons;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
