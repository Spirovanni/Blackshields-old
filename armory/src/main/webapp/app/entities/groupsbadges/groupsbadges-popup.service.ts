import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Groupsbadges } from './groupsbadges.model';
import { GroupsbadgesService } from './groupsbadges.service';

@Injectable()
export class GroupsbadgesPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private groupsbadgesService: GroupsbadgesService

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
                this.groupsbadgesService.find(id).subscribe((groupsbadges) => {
                    if (groupsbadges.date) {
                        groupsbadges.date = {
                            year: groupsbadges.date.getFullYear(),
                            month: groupsbadges.date.getMonth() + 1,
                            day: groupsbadges.date.getDate()
                        };
                    }
                    this.ngbModalRef = this.groupsbadgesModalRef(component, groupsbadges);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.groupsbadgesModalRef(component, new Groupsbadges());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    groupsbadgesModalRef(component: Component, groupsbadges: Groupsbadges): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.groupsbadges = groupsbadges;
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
