import {Image, IColumn, mergeStyleSets, SelectionMode, ShimmeredDetailsList, ImageFit} from "@fluentui/react";
import React, {useEffect, useState} from "react";
// @ts-ignore
import logo from "../logo.svg"
import api, {IPunchoutProduct} from "../Service/PunchoutApi";
interface IResultsProps {
    workspaceId: string;
}

const classNames = mergeStyleSets({
    fileIconHeaderIcon: {
        padding: 0,
        fontSize: '16px',
    },
    fileIconCell: {
        textAlign: 'center',
        selectors: {
            '&:before': {
                content: '.',
                display: 'inline-block',
                verticalAlign: 'middle',
                height: '100%',
                width: '0px',
                visibility: 'hidden',
            },
        },
    },
    fileIconImg: {
        verticalAlign: 'middle',
        maxHeight: '16px',
        maxWidth: '16px',
    },
    controlWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    exampleToggle: {
        display: 'inline-block',
        marginBottom: '10px',
        marginRight: '30px',
    },
    selectionDetails: {
        marginBottom: '20px',
    }
});
const ResultPage: React.FC<IResultsProps> = (props) => {
    
    const [punchoutData, setPunchoutData] = useState<IPunchoutProduct[]>();
    const [loading, setLoading] = useState<boolean>(false);
    
    React.useEffect(() => {
        if(!punchoutData)
            setLoading(true)
            api.punchoutProducts.details(props.workspaceId).then((a) => {
                console.log(a.items)
                setPunchoutData(a.items);
                setLoading(false);
            })
    }, [])
    
    const columns: IColumn[] = [
        {
            key: 'column1',
            name: 'Manufacturer Part Number',
            className: classNames.fileIconCell,
            iconClassName: classNames.fileIconHeaderIcon,
            fieldName: 'manufacturerPartNumber',
            isRowHeader: true,
            isResizable: true,
            isPadded: true,
            data: 'string',
            minWidth: 150,
            maxWidth: 300,
            onRender: (item: IPunchoutProduct) => {
                return <span>{item.manufacturerPartNumber}</span>;
            },
        },
        {
            key: 'column2',
            name: 'Description',
            fieldName: 'description',
            isMultiline: true,
            minWidth: 210,
            maxWidth: 350,
            isRowHeader: true,
            isResizable: true,
            data: 'string',
            onRender: (item: IPunchoutProduct) => {
                return <span className={"descriptionField"}>{item.description}</span>;
            },
            isPadded: true,
        },
        {
            key: 'column3',
            name: 'Quantity',
            fieldName: 'quantity',
            minWidth: 50,
            maxWidth: 90,
            isResizable: true,
            data: 'number',
            onRender: (item: IPunchoutProduct) => {
                return <span>{item.quantity}</span>;
            },
            isPadded: true,
        },
        {
            key: 'column4',
            name: 'Unit Price',
            fieldName: 'unitPrice',
            minWidth: 50,
            maxWidth: 90,
            isResizable: true,
            data: 'number',
            onRender: (item: IPunchoutProduct) => {
                return <span>{item.unitPrice}</span>;
            },
            isPadded: true,
        },
        {
            key: 'column5',
            name: 'Category',
            fieldName: 'category',
            minWidth: 210,
            maxWidth: 350,
            isRowHeader: true,
            isResizable: true,
            data: 'string',
            onRender: (item: IPunchoutProduct) => {
                return <span>{item.category}</span>;
            },
            isPadded: true,
        },
        {
            key: 'column6',
            name: 'Subcategory',
            fieldName: 'subCategory',
            minWidth: 210,
            maxWidth: 350,
            isRowHeader: true,
            isResizable: true,
            data: 'string',
            onRender: (item: IPunchoutProduct) => {
                return <span>{item.subCategory}</span>;
            },
            isPadded: true,
        },
        {
            key: 'column7',
            name: 'Thumbnail',
            fieldName: 'imageUrl',
            minWidth: 70,
            maxWidth: 90,
            isResizable: true,
            isCollapsible: true,
            data: 'number',
            onRender: (item: IPunchoutProduct) => {
                return <Image src={item.imageUrl ?? logo} imageFit={ImageFit.contain} width={50} height={50}/>;
            },
        },
    ];
    
    return (
        <div>
            <ShimmeredDetailsList items={punchoutData ?? []} enableShimmer={loading} columns={columns} selectionMode={SelectionMode.none} />
        </div>
    )
}
export default ResultPage;