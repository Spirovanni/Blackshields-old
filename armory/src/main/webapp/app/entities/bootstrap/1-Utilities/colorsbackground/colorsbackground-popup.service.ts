import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Colorsbackground } from './colorsbackground.model';
import { ColorsbackgroundService } from './colorsbackground.service';

@Injectable()
export class ColorsbackgroundPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private colorsbackgroundService: ColorsbackgroundService

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
                this.colorsbackgroundService.find(id).subscribe((colorsbackground) => {
                    if (colorsbackground.date) {
                        colorsbackground.date = {
                            year: colorsbackground.date.getFullYear(),
                            month: colorsbackground.date.getMonth() + 1,
                            day: colorsbackground.date.getDate()
                        };
                    }
                    this.ngbModalRef = this.colorsbackgroundModalRef(component, colorsbackground);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.colorsbackgroundModalRef(component, new Colorsbackground());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    colorsbackgroundModalRef(component: Component, colorsbackground: Colorsbackground): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.colorsbackground = colorsbackground;
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
