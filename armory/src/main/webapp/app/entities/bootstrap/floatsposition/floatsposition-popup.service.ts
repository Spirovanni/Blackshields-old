import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Floatsposition } from './floatsposition.model';
import { FloatspositionService } from './floatsposition.service';

@Injectable()
export class FloatspositionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private floatspositionService: FloatspositionService

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
                this.floatspositionService.find(id).subscribe((floatsposition) => {
                    if (floatsposition.date) {
                        floatsposition.date = {
                            year: floatsposition.date.getFullYear(),
                            month: floatsposition.date.getMonth() + 1,
                            day: floatsposition.date.getDate()
                        };
                    }
                    this.ngbModalRef = this.floatspositionModalRef(component, floatsposition);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.floatspositionModalRef(component, new Floatsposition());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    floatspositionModalRef(component: Component, floatsposition: Floatsposition): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.floatsposition = floatsposition;
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
