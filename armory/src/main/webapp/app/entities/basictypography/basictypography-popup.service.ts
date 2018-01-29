import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Basictypography } from './basictypography.model';
import { BasictypographyService } from './basictypography.service';

@Injectable()
export class BasictypographyPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private basictypographyService: BasictypographyService

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
                this.basictypographyService.find(id).subscribe((basictypography) => {
                    if (basictypography.date) {
                        basictypography.date = {
                            year: basictypography.date.getFullYear(),
                            month: basictypography.date.getMonth() + 1,
                            day: basictypography.date.getDate()
                        };
                    }
                    this.ngbModalRef = this.basictypographyModalRef(component, basictypography);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.basictypographyModalRef(component, new Basictypography());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    basictypographyModalRef(component: Component, basictypography: Basictypography): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.basictypography = basictypography;
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
