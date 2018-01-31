import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Textalignmentdisplay } from './textalignmentdisplay.model';
import { TextalignmentdisplayService } from './textalignmentdisplay.service';

@Injectable()
export class TextalignmentdisplayPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private textalignmentdisplayService: TextalignmentdisplayService

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
                this.textalignmentdisplayService.find(id).subscribe((textalignmentdisplay) => {
                    if (textalignmentdisplay.date) {
                        textalignmentdisplay.date = {
                            year: textalignmentdisplay.date.getFullYear(),
                            month: textalignmentdisplay.date.getMonth() + 1,
                            day: textalignmentdisplay.date.getDate()
                        };
                    }
                    this.ngbModalRef = this.textalignmentdisplayModalRef(component, textalignmentdisplay);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.textalignmentdisplayModalRef(component, new Textalignmentdisplay());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    textalignmentdisplayModalRef(component: Component, textalignmentdisplay: Textalignmentdisplay): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.textalignmentdisplay = textalignmentdisplay;
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
