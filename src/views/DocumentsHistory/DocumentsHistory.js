import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

import * as ROUTES from '../../routes/routes'

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';

import "./documentsHistory.scss"

function DocumentsHistory() {
    const navigate = useNavigate();

    const [documents, setDocuments] = useState(
        [
            {
                id: 'F001-12345678',
                client: {
                    clientId: '3333333333',
                    clientName: 'Razón Social'
                },
                date: '11/06/2022',
                total: 2655.00,
                igv: 18,
                discount: 0,
                discounts: 0,
                anticipated: 0,
                inafected: 0,
                free: 0,
                exonerated: 0,
                others: 0,
                articles: [
                    {
                        id: '00001',
                        name: 'Nombre del artículo',
                        unit: 'Kg.',
                        quantity: 5,
                        unitPrice: 150,
                    },
                    {
                        id: '00002',
                        name: 'Nombre del artículo',
                        unit: 'Kg.',
                        quantity: 10,
                        unitPrice: 150,
                    },
                ]
            },
            {
                id: 'F001-12345679',
                client: {
                    clientId: '10425135621',
                    clientName: 'Razón Social'
                },
                date: '11/06/2022',
                total: 265.50,
                igv: 18,
                discount: 0,
                discounts: 0,
                anticipated: 0,
                inafected: 0,
                free: 0,
                exonerated: 0,
                others: 0,
                articles: [
                    {
                        id: '00001',
                        name: 'Nombre del artículo',
                        unit: 'Kg.',
                        quantity: 5,
                        unitPrice: 15,
                    },
                    {
                        id: '00002',
                        name: 'Nombre del artículo',
                        unit: 'Kg.',
                        quantity: 10,
                        unitPrice: 15,
                    },
                ]
            },
            {
                id: 'B001-12345612',
                client: {
                    clientId: '22222222222',
                    clientName: 'Razón Social'
                },
                date: '12/06/2022',
                total: 442.50,
                igv: 18,
                discount: 0,
                discounts: 0,
                anticipated: 0,
                inafected: 0,
                free: 0,
                exonerated: 0,
                others: 0,
                articles: [
                    {
                        id: '00001',
                        name: 'Nombre del artículo',
                        unit: 'Kg.',
                        quantity: 5,
                        unitPrice: 25,
                    },
                    {
                        id: '00002',
                        name: 'Nombre del artículo',
                        unit: 'Kg.',
                        quantity: 10,
                        unitPrice: 25,
                    },
                ]
            },
            {
                id: 'B001-12345613',
                client: {
                    clientId: '22222222222',
                    clientName: 'Razón Social'
                },
                date: '12/06/2022',
                total: 100.3,
                igv: 18,
                discount: 0,
                discounts: 0,
                anticipated: 0,
                inafected: 0,
                free: 0,
                exonerated: 0,
                others: 0,
                articles: [
                    {
                        id: '00001',
                        name: 'Nombre del artículo',
                        unit: 'Kg.',
                        quantity: 5,
                        unitPrice: 10,
                    },
                    {
                        id: '00002',
                        name: 'Nombre del artículo',
                        unit: 'Kg.',
                        quantity: 10,
                        unitPrice: 3.5,
                    },
                ]
            },
        ]
    )

    const [documentSelected, setDocumentSelected] = useState(
        {
            id: 'F001-12345678',
            client: {
                clientId: '3333333333',
                clientName: 'Razón Social'
            },
            date: '11/06/2022',
            total: 2655.00,
            igv: 18,
            discount: 0,
            discounts: 0,
            anticipated: 0,
            inafected: 0,
            free: 0,
            exonerated: 0,
            others: 0,
            articles: [
                {
                    id: '00001',
                    name: 'Nombre del artículo',
                    unit: 'Kg.',
                    quantity: 5,
                    unitPrice: 150,
                },
                {
                    id: '00002',
                    name: 'Nombre del artículo',
                    unit: 'Kg.',
                    quantity: 10,
                    unitPrice: 150,
                },
            ]
        }
    )

    const [resume, setResume] = useState(
        {
            subtotal: 0,
            igv: 0,
            others: 0,
            total: 0,
        }
    )

    useEffect(() => {
        setDocumentSelected(documents[0])
    }, [documents])

    useEffect(() => {
        var newResume = {
            subtotal: 0,
            igv: 0,
            others: 0,
            total: 0,
        }

        for (const article of documentSelected.articles) {
            newResume.subtotal += article.unitPrice * article.quantity;
            
            newResume.igv += article.unitPrice * (documentSelected.igv/100) * article.quantity;
            
            newResume.total += article.unitPrice * (1 + documentSelected.igv/100) * article.quantity;
        }
        
        newResume.subtotal = Math.round((newResume.subtotal  + Number.EPSILON) * 100) / 100
        newResume.igv = Math.round((newResume.igv  + Number.EPSILON) * 100) / 100
        newResume.total = Math.round((newResume.total  + Number.EPSILON) * 100) / 100

        setResume(newResume);

    }, [documentSelected])

    const documentElements = (
        documents.map((document) => {
            return(
                <>
                    <Card className={document.id === documentSelected.id ? "document p-2 document-selected" : "document p-2"} key={document.id} onClick={() => {setDocumentSelected(document)}}>
                        <Row className="m-0 d-flex align-items-start">
                            <Col className="col-3 label">
                                Factura:
                            </Col>
                            <Col id="document-id" className="p-0">
                                {document.id}
                            </Col>
                        </Row>
                        <Row className="m-0 d-flex align-items-start">
                            <Col className="col-3 label">
                                Cliente:
                            </Col>
                            <Col id="document-client" className="p-0">
                                {document.client.clientId} - {document.client.clientName}
                            </Col>
                        </Row>
                        <Row className="m-0 d-flex align-items-start">
                            <Col className="d-flex align-items-end">
                                <Row className="m-0">
                                    <Col className="col-auto label p-0">
                                        Fecha:
                                    </Col>
                                    <Col id="document-date" className="p-0">
                                        {document.date}
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row className="m-0">
                                    <Col className="col-auto d-flex align-items-end label p-0">
                                        Monto Total:
                                    </Col>
                                    <Col id="document-total" className="p-0 text-end">
                                        S/ {document.total}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </>
            )
        })
    )

    const documentArticles = (
        documentSelected.articles.map((article) => {
            return (
                <>
                    <Card className="article" key={article.id}>
                        <Row className="m-0">
                            <Col className="p-0">
                                <Row className="m-0 d-flex">
                                    <Col className="article-code col-12 col-sm-auto p-0">
                                        {article.id}
                                    </Col>
                                    <Col className="article-name">
                                        {article.name}
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="p-0 d-flex justify-content-end">
                                <Row className="m-0 d-flex w-100">
                                    <Col className="article-code col-12 col-sm-6 text-end">
                                        <Row className="m-0">
                                            <Col className="col-6 label p-0">
                                                U. Med.
                                            </Col>
                                            <Col id="document-total" className="col-5 p-0 text-end">
                                                {article.unit}
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col className="article-name col-12 col-sm-6 p-0 text-end">
                                        <Row className="m-0 d-flex justify-content-end">
                                            <Col className="col-6 label p-0">
                                                Cant.
                                            </Col>
                                            <Col id="document-total" className="col-5 p-0 text-end">
                                                {article.quantity}
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="m-0 mb-3 d-flex justify-content-between">
                            <Col className="col-12 col-sm-auto p-0">
                                <Row className="m-0">
                                    <Col className="col-auto label p-0">
                                        P. Unit.
                                    </Col>
                                    <Col id="document-total" className="col-auto p-0 text-end">
                                        S/ {article.unitPrice}
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="col-12 col-sm-auto p-0">
                                <Row className="m-0">
                                    <Col className="col-auto label p-0">
                                        P.U. c/IGV
                                    </Col>
                                    <Col id="document-total" className="col-auto p-0 text-end">
                                        S/ {Math.round(((article.unitPrice * (1 + documentSelected.igv/100))  + Number.EPSILON) * 100) / 100}
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="col-12 col-sm-auto p-0">
                                <Row className="m-0">
                                    <Col className="col-auto label p-0">
                                        Val. Venta
                                    </Col>
                                    <Col id="document-total" className="col-auto p-0 text-end">
                                        S/ {article.unitPrice * article.quantity}
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="col-12 col-sm-auto p-0">
                                <Row className="m-0">
                                    <Col className="col-auto label p-0">
                                        I.G.V.
                                    </Col>
                                    <Col id="document-total" className="col-auto p-0 text-end">
                                        S/ {Math.round(((article.unitPrice * (documentSelected.igv/100) * article.quantity)  + Number.EPSILON) * 100) / 100}
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="col-12 col-sm-auto p-0">
                                <Row className="m-0">
                                    <Col className="col-auto label p-0">
                                        Total
                                    </Col>
                                    <Col id="document-total" className="col-auto p-0 text-end">
                                        S/ {Math.round(((article.unitPrice * (1 + documentSelected.igv/100) * article.quantity)  + Number.EPSILON) * 100) / 100}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </>
            )
        })
    )

    return (
        <div id="documentsHistory">
            <div className="p-4">
                <Row className="m-0">
                    <Col>
                        <h3>Listado de documentos</h3>
                    </Col>
                    <Col>
                        <h6 className="text-end mt-2">USUARIO - NOMBRE EMPRESA</h6>
                    </Col>
                </Row>
                <div className="card p-2 mb-3">
                    <Row className="m-0">
                        <Col className="col-2">
                            <Form.Label htmlFor="documentType">Tipo de documento</Form.Label>
                            <Form.Select aria-label="documentType">
                                <option selected>Todos</option>
                                <option value="1">DNI</option>
                                <option value="2">Pasaporte</option>
                                <option value="3">Carnet de extranjería</option>
                            </Form.Select>
                        </Col>
                        <Col className="col-3 d-flex flex-column justify-content-end">
                            <Form.Label htmlFor="searhClient">Cliente</Form.Label>
                            <InputGroup>
                                <FormControl id="searhClient" placeholder="RUC - DNI - Nombre"/>
                            </InputGroup>
                        </Col>
                        <Col className="col-2 d-flex flex-column justify-content-end">
                            <Form.Label htmlFor="issueDate">Fecha Emisión</Form.Label>
                            <InputGroup>
                                <FormControl id="issueDate" placeholder="Desde"/>
                            </InputGroup>
                        </Col>
                        <Col className="col-2 d-flex flex-column justify-content-end">
                            <InputGroup>
                                <FormControl id="issueDateEnd" placeholder="Hasta"/>
                            </InputGroup>
                        </Col>
                        <Col className="col-3 p-0 d-flex justify-content-end align-items-end search-buttons">
                            <Button>
                                Buscar
                            </Button>
                            <Button>
                                Limpiar
                            </Button>
                            <Button onClick={()=> navigate(ROUTES.NUEVO_DOCUMENTO)}>
                                Nuevo
                            </Button>
                        </Col>
                    </Row>
                </div>
                <Row className="m-0">
                    <Col className="col-5">
                        <Card>
                            <Card.Header>Documentos</Card.Header>
                            <Card.Body className="p-3">
                                {documentElements}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-7">
                        <Card className="mb-3">
                            <Card.Header>Detalle</Card.Header>
                            <Card.Body className="p-3">
                                <Row className="m-0">
                                    <Col className="col-12 col-sm-auto">
                                        <Row className="m-0">
                                            <Col className="col-auto label p-0">
                                                Factura:
                                            </Col>
                                            <Col id="document-id" className="p-0">
                                                {documentSelected.id}
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col className="col-12 col-sm-auto">
                                        <Row className="m-0">
                                            <Col className="col-auto label p-0">
                                                Cliente:
                                            </Col>
                                            <Col id="document-client" className="p-0">
                                                {documentSelected.client.clientId} - {documentSelected.client.clientName}
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col className="col-12 col-sm-auto">
                                        <Row className="m-0">
                                            <Col className="col-auto label p-0">
                                                Fecha:
                                            </Col>
                                            <Col id="document-date" className="p-0">
                                                {documentSelected.date}
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col className="col-12 col-sm-auto">
                                        <Row className="m-0">
                                            <Col className="col-auto label p-0">
                                                Monto Total:
                                            </Col>
                                            <Col id="document-total" className="p-0 text-end">
                                                S/ {documentSelected.total}
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className="m-0 mb-3 d-flex justify-content-between">
                                    <Col className="col-12 col-sm-auto">
                                        <Row className="m-0 label">
                                            I.G.V
                                        </Row>
                                        <Row className="m-0">
                                            {documentSelected.igv}%
                                        </Row>
                                    </Col>
                                    <Col className="col-12 col-sm-auto">
                                        <Row className="m-0 label">
                                            % Dscto.
                                        </Row>
                                        <Row className="m-0">
                                            {documentSelected.discount}%
                                        </Row>
                                    </Col>
                                    <Col className="col-12 col-sm-auto">
                                        <Row className="m-0 label">
                                            Dsctos.
                                        </Row>
                                        <Row className="m-0">
                                            S/ {documentSelected.discounts}
                                        </Row>
                                    </Col>
                                    <Col className="col-12 col-sm-auto">
                                        <Row className="m-0 label">
                                            Anticipo
                                        </Row>
                                        <Row className="m-0">
                                            S/ {documentSelected.anticipated}
                                        </Row>
                                    </Col>
                                    <Col className="col-12 col-sm-auto">
                                        <Row className="m-0 label">
                                            Inafecto
                                        </Row>
                                        <Row className="m-0">
                                            S/ {documentSelected.inafected}
                                        </Row>
                                    </Col>
                                    <Col className="col-12 col-sm-auto">
                                        <Row className="m-0 label">
                                            Gratuito
                                        </Row>
                                        <Row className="m-0">
                                            S/ {documentSelected.free}
                                        </Row>
                                    </Col>
                                    <Col className="col-12 col-sm-auto">
                                        <Row className="m-0 label">
                                            Exonerado
                                        </Row>
                                        <Row className="m-0">
                                            S/ {documentSelected.exonerated}
                                        </Row>
                                    </Col>
                                    <Col className="col-12 col-sm-auto">
                                        <Row className="m-0 label">
                                            Otros
                                        </Row>
                                        <Row className="m-0">
                                            S/ {documentSelected.others}
                                        </Row>
                                    </Col>
                                </Row>
                                <h5><strong>Articulos</strong></h5>
                                {documentArticles}
                            </Card.Body>
                        </Card>
                        <Row className="m-0 d-flex justify-content-between">
                            <Col className="col-12 col-sm-6 p-0">
                                <Card>
                                    <Card.Header>Pagos</Card.Header>
                                    <Card.Body className="p-3">
                                        <Row className="m-0">
                                            <Col className="label">
                                                VISA (**** **** **** 1234):
                                            </Col>
                                            <Col className="text-end">
                                                S/ 2000.00
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className="col-12 col-sm-5 p-0">
                                <Card>
                                    <Card.Header>Resumen</Card.Header>
                                    <Card.Body className="p-3">
                                        <Row className="m-0">
                                            <Col className="label">
                                                Subtotal:
                                            </Col>
                                            <Col className="text-end">
                                                S/ {resume.subtotal}
                                            </Col>
                                        </Row>
                                        <Row className="m-0">
                                            <Col className="label">
                                                I.G.V.:
                                            </Col>
                                        <Col className="text-end">
                                            S/ {resume.igv}
                                        </Col>
                                    </Row>
                                    <Row className="m-0">
                                        <Col className="label">
                                            Otros impuestos:
                                        </Col>
                                        <Col className="text-end">
                                            S/ {resume.others}
                                        </Col>
                                    </Row>
                                    <Row className="m-0">
                                        <Col className="label">
                                            Total Venta:
                                        </Col>
                                        <Col className="text-end">
                                            S/ {resume.total}
                                        </Col>
                                    </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

        </div>
    );
}

export default DocumentsHistory;