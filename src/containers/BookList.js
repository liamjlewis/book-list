import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getBooks } from "../api/books";
import { Jumbotron, Button, Container, Row, Col, Spinner, Card } from 'react-bootstrap';


export default function BookList() {

    const routerHistory = useHistory();
    const routerLocation = useLocation();
    const queryParams = new URLSearchParams(routerLocation.search);

    const [dataList, setDataList] = useState(null);
    const [page, setPage] = useState(queryParams.get('page') ? parseInt(queryParams.get('page'))  : 1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    
    
    useEffect(() => {
        getBooks(page, itemsPerPage).then((data) => {
            setDataList(data);
        });
    }, [page, itemsPerPage]);

    const pageChange = (amount) => {
        const newPage = (page + amount < 1) ? 1 : page + amount;
        setPage(newPage);
        updateQueryParams('page', newPage);
    }

    const updateQueryParams = (param, value) => {
        queryParams.set(param, value);
        routerHistory.push(`?${queryParams.toString()}`);
    }

    const showingLow = (page * itemsPerPage - itemsPerPage) + 1;
    const showingHigh = page * itemsPerPage;
    const showingTotal = dataList ? dataList.count : '';

    return (
        <Container>
            <Jumbotron className="d-flex justify-content-center">
                <h1>Books List</h1>
            </Jumbotron>
            <Row>
                <Col xs="12" sm="6" className="d-flex justify-content-end">
                    <Button onClick={() => pageChange(-1)} disabled={!dataList}>
                        prev
                    </Button>
                </Col>
                <Col xs="12" sm="6" className="d-flex justify-content-start">
                    <Button onClick={() => pageChange(1)} disabled={!dataList}>
                        next
                    </Button>
                </Col>
            </Row>
            <Row className={`mt-4 ${dataList && !dataList.books.length && 'd-none'}`}>
                <Col xs="12" className="d-flex justify-content-center">
                    <p>Showing {showingLow} - {showingHigh} of {showingTotal}</p>
                </Col>
            </Row>
            <Row>
                {
                    dataList ? (
                        dataList.books.map((book) => (
                            <Col key={book.id} xs="12" sm="3" className="mt-4 book-item">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{book.book_title}</Card.Title>
                                        <Card.Text>
                                            <p>{book.book_author}</p>
                                            <p>{book.book_publication_year}</p>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col>
                            <Spinner animation="border" variant="primary" />
                        </Col>
                    )
                }
            </Row>
        </Container>
    );
}