import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBTable,
  MDBTableBody,
  MDBTableHead
} from 'mdbreact';

class Marks extends React.Component {


render() {
    return (
            <MDBCard className="mt-5">
              <MDBCardBody>
                <MDBTable>
                  <MDBTableHead>
                    <tr>
                      <th>#</th>
                      <th>Урок</th>
                      <th>День</th>
                      <th>Оцінка</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>1</td>
                      <td>Фізика</td>
                      <td>03</td>
                      <td>8</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Фіз-ра</td>
                      <td>05</td>
                      <td>12</td>
                    </tr>
                  </MDBTableBody>
                </MDBTable>
              </MDBCardBody>
</MDBCard>   )}
}
export default Marks;

