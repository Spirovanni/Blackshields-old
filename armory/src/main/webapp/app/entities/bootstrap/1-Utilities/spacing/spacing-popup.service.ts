import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Spacing } from './spacing.model';
import { SpacingService } from './spacing.service';

@Injectable()
export class SpacingPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private spacingService: SpacingService

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
                this.spacingService.find(id).subscribe((spacing) => {
                    if (spacing.date) {
                        spacing.date = {
                            year: spacing.date.getFullYear(),
                            month: spacing.date.getMonth() + 1,
                            day: spacing.date.getDate()
                        };
                    }
                    this.ngbModalRef = this.spacingModalRef(component, spacing);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.spacingModalRef(component, new Spacing());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    spacingModalRef(component: Component, spacing: Spacing): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.spacing = spacing;
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
