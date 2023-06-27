import React, {useEffect, useState} from "react";
import SimpleBar from 'simplebar-react';
import {Link, useLocation} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft, faArrowRight, faBuilding, faHome, faUsers} from "@fortawesome/free-solid-svg-icons";
import {Badge, Image, Nav} from '@themesberg/react-bootstrap';

import {Routes} from "../routes";
import imgBix from "../assets/img/bix.png";

export default (props = {}) => {
    const location = useLocation();
    const {pathname} = location;
    const [show, setShow] = useState(window.innerWidth >= 1200); // defines if sidebar starts open or closed
    const showClass = show ? "show" : "";

    const toggle = () => setShow(!show);

    const NavItem = (props) => {
        const {
            title,
            link,
            external,
            target,
            icon,
            image,
            badgeText,
            badgeBg = "secondary",
            badgeColor = "primary"
        } = props;
        const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : "";
        const navItemClassName = link === pathname ? "active" : "";
        const linkProps = external ? {href: link} : {as: Link, to: link};

        return (
            <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
                <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? <span className="sidebar-icon"><FontAwesomeIcon icon={icon}/> </span> : null}
              {image ? <Image src={image} width={20} height={20} className="sidebar-icon svg-icon"/> : null}
              <span className="sidebar-text">{show ? title : ''}</span>
          </span>
                    {badgeText ? (
                        <Badge pill bg={badgeBg} text={badgeColor}
                               className="badge-md notification-count ms-2">{badgeText}</Badge>
                    ) : null}
                </Nav.Link>
            </Nav.Item>
        );
    };

    // resize main content
    useEffect(() => {
        if (!show) {
            document.getElementById('content').style.marginLeft = "90px";
        } else {
            document.getElementById('content').style.marginLeft = "200px";
        }
    }, [show])

    return (
        <>
            <SimpleBar style={{width: show ? "200px" : "85px"}}
                       className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
                <div className="sidebar-inner px-4 pt-3 row">
                    <div className={show ? "text-end pt-1 pb-3 col-md-12" : "text-center pt-1 pb-3 col-md-12"}>
                        <a><FontAwesomeIcon icon={show ? faArrowLeft : faArrowRight} onClick={toggle}/></a>
                    </div>
                    {show ?
                        <div className="pt-3 pb-3 col-md-12">
                            <a href="https://bixtecnologia.com.br/" target={"_blank"} rel="noopener noreferrer"><Image src={imgBix}/></a>
                        </div>
                        : null}
                    <Nav className="flex-column pt-3 pt-md-0">
                        <NavItem title="Home" icon={faHome} link={Routes.Home.path}/>
                        <NavItem title="Companies" icon={faBuilding} link={Routes.Companies.path}/>
                        <NavItem title="Employees" icon={faUsers} link={Routes.Employees.path}/>
                    </Nav>
                </div>
            </SimpleBar>
        </>
    );
};
