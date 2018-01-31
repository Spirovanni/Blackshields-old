import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Navbar } from './navbar.model';
import { NavbarService } from './navbar.service';

@Injectable()
export class NavbarPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private navbarService: NavbarService

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
                this.navbarService.find(id).subscribe((navbar) => {
                    if (navbar.date) {
                        navbar.date = {
                            year: navbar.date.getFullYear(),
                            month: navbar.date.getMonth() + 1,
                            day: navbar.date.getDate()
                        };
                    }
                    this.ngbModalRef = this.navbarModalRef(component, navbar);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.navbarModalRef(component, new Navbar());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    navbarModalRef(component: Component, navbar: Navbar): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.navbar = navbar;
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
