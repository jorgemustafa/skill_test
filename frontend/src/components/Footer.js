import React from "react";
import moment from "moment-timezone";
import {Card, Col, Row} from '@themesberg/react-bootstrap';

export default (props) => {
    const currentYear = moment().get("year");
    return (
        <div>
            <footer className="footer section py-5">
                <Row>
                    <Col className="mb-4 mb-lg-0">
                        <p className="mb-0 text-center">
                            Copyright © {`${currentYear} `}
                            <Card.Link href="https://jorgemustafa.com.br" target="_blank"
                                       className="text-blue text-decoration-none fw-normal">
                                Jorge Mustafa
                            </Card.Link>
                        </p>
                    </Col>
                </Row>
            </footer>
        </div>
    );
};
