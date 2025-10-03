import React, {useMemo}from "react"
import { useTable} from "react-table"

const TableContainer = ({onDelete, onUpdate, onDone, data, sortDone, sortPriority, sortDueDate}) => {

  const handleChange = (e) => {
    const checked = e.target.checked;
    const checkedValue = e.target.value;
    const checkedName = e.target.name;
    if(checkedName === 'done'){
      sortDone(checked)
    }
    if(checkedName === 'priority'){
      sortPriority(checked)
    }
    if(checkedName === 'dueDate'){
      sortDueDate(checked)
    }
    if(checkedName === 'setDone'){
      onDone(checkedValue, checked)
    }
    };
  
  const columns = useMemo(
    () => [
      {
        Header: "Done",
        accessor: "done",
      },
      {
        Header: "Name",
        accessor: "text",
      },
      {
        Header: "Priority",
        accessor: "priority",
      },
      {
        Header: "Due Date",
        accessor: "dueDate",
      }
    ],
    []
  )

  const getBackgroundColor = (dueDate) => {
    if (!dueDate) return "";
    const currentDate = new Date();
    const due = new Date(dueDate);
    const diffInDays = Math.ceil((due - currentDate) / (1000 * 60 * 60 * 24));

    if (diffInDays <= 7) return "red";
    if (diffInDays <= 14) return "yellow";
    return "green";
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data,}
  )

  return (
    <div className="container">
      <table {...getTableProps()} className="styled-table">
        <thead>
          <tr>
            <th className="table-header">
              Done
              <input
                id="sorter"
                type="checkbox"
                name="done"
                onChange={(e) => handleChange(e)}
                className="checkbox">
              </input>
            <i class="material-icons">sort</i> 
            </th>
            <th className="table-header">Name</th>
            <th className="table-header">
              Priority
              <input
                id="sorter"
                type="checkbox"
                name="priority"
                onChange={(e) => handleChange(e)}
                className="checkbox"
              />
            <i class="material-icons">sort</i> 
            </th>
            <th className="table-header">
              Due Date
              <input
                id="sorter"
                type="checkbox"
                name="dueDate"
                onChange={(e) => handleChange(e)}
                className="checkbox"
              />
            <i class="material-icons">sort</i> 
            </th>
          </tr>
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            const date = new Date(row.original.dueDate).toLocaleDateString('es-MX');
            const backgroundColor = getBackgroundColor(row.original.dueDate);
            const textDecoration = row.original.done ? 'line-through' : 'none';
            return (
              <tr
                key={row.id} {...row.getRowProps()}
                style={{ backgroundColor, textDecoration }}
                className="table-row"
              >
                <td className="table-cell">
                  <input
                    type="checkbox"
                    name="setDone"
                    value={row.original.id}
                    checked={row.original.done}
                    onChange={(e) => handleChange(e)}
                  />
                </td>
                <td className="table-cell">
                  {row.original.text}
                </td>
                <td className="table-cell">
                  {row.original.priority}
                </td>
                <td className="table-cell">
                  {row.original.dueDate ? date : ''}
                </td>
                <td className="table-cell">
                  <button onClick={() => onUpdate(row.original.id)}>Edit</button>
                  <button onClick={() => onDelete(row.original.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

export default TableContainer