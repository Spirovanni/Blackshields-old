import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Breakpoints } from './breakpoints.model';
import { BreakpointsService } from './breakpoints.service';

@Injectable()
export class BreakpointsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private breakpointsService: BreakpointsService

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
                this.breakpointsService.find(id).subscribe((breakpoints) => {
                    if (breakpoints.date) {
                        breakpoints.date = {
                            year: breakpoints.date.getFullYear(),
                            month: breakpoints.date.getMonth() + 1,
                            day: breakpoints.date.getDate()
                        };
                    }
                    this.ngbModalRef = this.breakpointsModalRef(component, breakpoints);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.breakpointsModalRef(component, new Breakpoints());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    breakpointsModalRef(component: Component, breakpoints: Breakpoints): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.breakpoints = breakpoints;
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
