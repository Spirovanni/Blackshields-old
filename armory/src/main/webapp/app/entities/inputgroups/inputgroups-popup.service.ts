import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Inputgroups } from './inputgroups.model';
import { InputgroupsService } from './inputgroups.service';

@Injectable()
export class InputgroupsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private inputgroupsService: InputgroupsService

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
                this.inputgroupsService.find(id).subscribe((inputgroups) => {
                    if (inputgroups.date) {
                        inputgroups.date = {
                            year: inputgroups.date.getFullYear(),
                            month: inputgroups.date.getMonth() + 1,
                            day: inputgroups.date.getDate()
                        };
                    }
                    this.ngbModalRef = this.inputgroupsModalRef(component, inputgroups);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.inputgroupsModalRef(component, new Inputgroups());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    inputgroupsModalRef(component: Component, inputgroups: Inputgroups): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.inputgroups = inputgroups;
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
