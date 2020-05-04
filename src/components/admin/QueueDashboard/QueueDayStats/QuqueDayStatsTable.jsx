import React, { Component } from "react";
import MaterialTable from "material-table";

class QueueDayStatsTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            table: {
                title: 'Список абитуриентов',
                columns: [
                    { title: 'Имя', field: 'firstName' },
                    { title: 'Фамилия', field: 'lastName' },
                    { title: 'Электронная почта', field: 'email' },
                    { title: 'Время', field: 'time', },
                ],
                data: [],
            }
        }
    }

    static getDerivedStateFromProps({ data }, prevState) {
        if (!data) return prevState;
        const { users } = data;
        return {
            ...prevState,
            table: {
                ...prevState.table,
                title: `Список абитуриентов (${users.length})`,
                data: users
            }
        };
    }

    render() {
        return (
            <MaterialTable
                title={this.state.table.title}
                options={{
                    pageSizeOptions: [20, 40, 60, 100, 150],
                    pageSize: 7,
                    paginationType: 'stepped',
                    emptyRowsWhenPaging: false,
                    exportButton: true
                }}
                columns={this.state.table.columns}
                data={this.state.table.data}
                localization={{
                    body: {
                        emptyDataSourceMessage: 'Пусто'
                    },
                    pagination: {
                        labelRowsSelect: 'записей',
                        labelDisplayedRows: '{from}-{to} из {count}'
                    },
                    toolbar: {
                        searchPlaceholder: 'Поиск',
                        exportTitle: 'Экспорт',
                        exportName: 'Экспортировать в CSV'
                    }
                }}
            />
        )
    }
}

export default QueueDayStatsTable;