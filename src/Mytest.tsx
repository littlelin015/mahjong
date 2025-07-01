// MyTestComponent.tsx
import React from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // 確保這個也引入了

const MyTestComponent: React.FC = () => {
  return (
    <div>
      <h2>測試 Table 組件</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default MyTestComponent;