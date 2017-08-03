import * as React from 'react';
import * as hash from 'object-hash';
import { 
    TableProps, 
    Table,
    TableBody,
    TableCell, 
    TableFooter,
    TableHeaderCell,
    TableRow,
    TableHeader, 
    Menu, 
    Icon, 
    MenuItem 
} from 'semantic-ui-react';

interface DataTableState {
    currentPage: number;
    rowsPerPage: number;
    numberOfPages: number;
    columns: string[];
}

interface DataTableProps extends TableProps {
    data: any[];
    rowsPerPage?: number;
    tableProps?: TableProps;
    header?: boolean;
    columnHeader?:string[];
}

export default class DataTable extends React.Component<DataTableProps, DataTableState> {

    constructor(props: DataTableProps) {
        super(props);

        const rowsPerPage = props.rowsPerPage || 5;
        const numberOfPages = Math.ceil(props.data.length / rowsPerPage)
        const columns = props.columnHeader || Object.keys(props.data[0] || [])

        this.state = {
            currentPage: 1,
            rowsPerPage: rowsPerPage,
            numberOfPages: numberOfPages,
            columns: columns
        }
    }

    handlePageClick = (e: React.MouseEvent<HTMLElement>) => {
        this.setState({
            currentPage: parseInt(e.currentTarget.dataset["page"])
        })
    }

    handleDirectionClick = (e:React.MouseEvent<HTMLElement>) => {
        let direction = e.currentTarget.dataset["direction"]

        let change = 0
        if (direction === "LEFT" && this.state.currentPage > 1) {
            change = -1
        } else if (direction === "RIGHT" && this.state.currentPage < this.state.numberOfPages) {
            change = 1
        }

        if (change !== 0) {
            this.setState({
                currentPage: this.state.currentPage += change
            })
        }
    }


    render() {

        const {data} = this.props;
        const {currentPage, rowsPerPage, numberOfPages, columns} = this.state;

        //slice current data set (more filters could be added, and also sorting)
        const currentData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);


        //define start page
        let startPage;
        if (numberOfPages <= 3 || this.state.currentPage === 1) {
            startPage = 1
        } else if (this.state.currentPage === numberOfPages) {
            startPage = this.state.currentPage - 2;
        } else {
            startPage = this.state.currentPage - 1;
        }

        let pageRange: number[] = Array.from(new Array(Math.min(3, numberOfPages)), (x, i) => i + startPage)

        return (
            <div>
                <Table {...this.props.tableProps}>
                    {this.props.header &&
                        <TableHeader>
                            <TableRow>
                                {columns.map(key => 
                                    <TableHeaderCell key={key}>{key}</TableHeaderCell>
                                    )}
                            </TableRow>
                        </TableHeader>
                    }
                    <TableBody>
                        {currentData.map(row =>
                            <TableRow key={hash(row)}>
                                {columns.map((key) =>
                                    <TableCell 
                                        key={hash({ ...row, key })}
                                        content={row[key]}
                                    />
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableHeaderCell {...{colSpan:3}}>
                                <Menu floated='right' pagination>
                                    <MenuItem
                                        icon="angle double left"
                                        data-page={1}
                                        onClick={this.handlePageClick}
                                        />
                                    <MenuItem
                                        data-direction="LEFT"
                                        onClick={this.handleDirectionClick}
                                        icon="angle left"/>
                                    {pageRange.map(pageIndex =>
                                        <MenuItem
                                            key={pageIndex}
                                            content={`${pageIndex}`}
                                            data-page={pageIndex}
                                            onClick={this.handlePageClick}
                                            active={pageIndex === this.state.currentPage}
                                            as='a' />
                                    )}
                                    <MenuItem
                                        data-direction="RIGHT"
                                        onClick={this.handleDirectionClick}
                                        icon="angle right"/>
                                    <MenuItem
                                        icon="angle double right"
                                        data-page={numberOfPages}
                                        onClick={this.handlePageClick}
                                        />
                                </Menu>
                            </TableHeaderCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        );
    }
}