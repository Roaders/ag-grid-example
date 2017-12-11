import { Component } from '@angular/core';

import { ColDef, GridOptions, GetDataPath } from "ag-grid";
import { ValueFormatterParams } from "ag-grid/dist/lib/entities/colDef"

import "ag-grid-enterprise";

export enum TaskType {
    Hoover = "Hoover",
    Wash = "Wash",
    Tidy = "Tidy"
}

export interface ITask {
    name: string;
    id: string;
    type: TaskType;
    parentId?: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    public rowData: ITask[] = [
        {
            id: "taskOne",
            name: "Tidy Study",
            type: TaskType.Tidy
        },
        {
            id: "taskTwo",
            name: "Hoover Rug",
            type: TaskType.Hoover,
            parentId: "taskOne"
        },
        {
            id: "taskThree",
            name: "Tidy Desk",
            type: TaskType.Tidy,
            parentId: "taskOne"
        },
        {
            id: "taskFour",
            name: "Tidy Kitchen",
            type: TaskType.Tidy
        },
        {
            id: "taskFive",
            name: "Mop Floor",
            type: TaskType.Wash,
            parentId: "taskFour"
        },
        {
            id: "taskSix",
            name: "Clean Dishes",
            type: TaskType.Wash,
            parentId: "taskFour"
        },
        {
            id: "taskSeven",
            name: "Tidy Bedroom",
            type: TaskType.Tidy
        },
        {
            id: "taskEight",
            name: "Hoover Floor",
            type: TaskType.Hoover,
            parentId: "taskSeven"
        },
        {
            id: "taskNine",
            name: "Clean Sink",
            type: TaskType.Wash,
            parentId: "taskSeven"
        },
        {
            id: "taskTen",
            name: "Tidy Bedroom",
            type: TaskType.Tidy
        },
        {
            id: "taskEleven",
            name: "Sort Washing",
            type: TaskType.Tidy,
            parentId: "taskTen"
        },
        {
            id: "taskTwelve",
            name: "Empty Laundry Hamper",
            type: TaskType.Tidy,
            parentId: "taskTen"
        },
        {
            id: "taskTwelve",
            name: "Empty Bin",
            type: TaskType.Tidy,
            parentId: "taskThree"
        },
        {
            id: "taskThirteen",
            name: "Tidy Drawer",
            type: TaskType.Tidy,
            parentId: "taskThree"
        }
    ];

    public getDataPath(data: ITask) {
        return this.getRowHierarchy(data);
    };

    public gridOptions: GridOptions = {
        animateRows: true,
        treeData: true,
        getDataPath: this.getDataPath.bind(this),
        autoGroupColumnDef: {
            headerName: "Name",
            valueFormatter: this.formatGroupColumn,
            cellRendererParams: {
                padding: 20
            }
        }
    }

    public columnDefs: ColDef[] = [
        {
            headerName: "Type",
            field: "type"
        },
        {
            headerName: "Name",
            field: "name"
        }
    ];

    private formatGroupColumn(params: ValueFormatterParams): string{
        const task: ITask = params.data as ITask;

        return task ? task.name : "-";
    }

    private getRowHierarchy(task: ITask, children?: string[]){
        children = children ? children : [];

        children.unshift(task.id);

        const parent = task.parentId ? this.rowData.filter(row => row.id === task.parentId)[0] : undefined;

        if (parent == null) {
            return children;
        }

        return this.getRowHierarchy(parent, children);
    }
}