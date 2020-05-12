import React from "react";
import {
  MDBBtn,
  MDBModal,
  MDBNav,
  MDBLink,
  MDBContainer,
  MDBInput,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBCollapse,
  MDBNavbarToggler,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon

} from "mdbreact";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import logo from "../assets/logo3big.png";
import "./sideBarStyle.css";
class SideBar extends React.Component {
  state = {
    modal8: false,
    mailAddress: "@mdo",
    collapseID: ''
  };
  toggleCollapse = collapseID => () =>
       this.setState(prevState => ({
         collapseID: prevState.collapseID !== collapseID ? collapseID : ''
       }));

  toggle = nr => () => {
    const modalNumber = `modal${nr}`;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };

  render() {
    const { modal8,isOpen, collapseID } = this.state;
    return (
      <div>
<MDBNavbar 
            color="indigo"
            dark
            expand='md'
            fixed-top
            scrolling     
            id="NavBar"      
          >
            <MDBNavbarBrand>
      {/* TODO логотип та красивий шрифт */}
      
              <strong className='white-text'><i onClick={this.toggle(8)} className="fa fa-navicon "></i><img src={logo} id="logo"/>EJournal</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler
              onClick={this.toggleCollapse('navbarCollapse3')}
            />  
            <MDBCollapse id='navbarCollapse3' isOpen={collapseID} navbar>
              <MDBNavbarNav right>
              <MDBNavItem>
              <MDBDropdown>
                  <MDBDropdownToggle id="dropDown1" className='dopdown-toggle' nav>
      {/* TODO динамічно підтягувати кількість нових новин та стислу інформацію*/}
                    1<MDBIcon id="News" icon='bell' className='ml-1'/>
                  </MDBDropdownToggle>
      {/* TODO красиві dropdown */}
                    <MDBDropdownMenu className='dropdown-default' right>
      {/* TODO динамічно підтягувати стислу інформацію*/}
                      <MDBDropdownItem href='#!'>Something new</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBDropdown>
                    <MDBDropdownToggle className='dopdown-toggle' nav>
                      <img
      //TODO  динамічно підтягувати імейдж юзера 
                        src='https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg'
                        className='rounded-circle z-depth-0'
                        alt=''
                        id="profileImage"
                      />
                    </MDBDropdownToggle>
                    <MDBDropdownMenu id="dropMenu1" className='dropdown-default' right>
      {/* TODO перекидувати на те куди потрібно*/}
                      <MDBDropdownItem href='#!'><MDBIcon icon='fas fa-user' className='ml-1'/> My account</MDBDropdownItem>
                      <MDBDropdownItem href='#!'><MDBIcon icon='fas fa-cog' className='ml-1'/> Settings</MDBDropdownItem>
                      <MDBDropdownItem href='#!'><i class="fas fa-sign-out-alt"></i> Log out</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
        <MDBModal
          size='sm'
          isOpen={modal8}
          
          toggle={this.toggle(8)}
          fullHeight
         
          position="left"
        >
          <MDBNav className="image text-left flex-column font-weight-bold">
            
          <i className="text-right" onClick={this.toggle(8)} class="fas fa-chevron-left"></i>
            <div className="text-center">
              <img
                src={logo}
                height="150"
                width="220"
              />
            </div>
            <MDBLink to="/login" ><i className="fas fa-book fa-2x mr-2"></i>Login</MDBLink>
            <MDBLink to="#!"><i className="fas fa-chess fa-2x mr-2"></i>Link 6</MDBLink>
            <MDBLink to="#!"><i className="fas fa-chess fa-2x mr-2"></i>Link 3</MDBLink>
            <MDBLink to="#!"><i className="fas fa-chess fa-2x mr-2"></i>Link 3</MDBLink>
            <MDBLink to="#!"><i className="fas fa-chess fa-2x mr-2"></i>Link 3</MDBLink>
            <MDBLink to="#!"><i className="fas fa-chess fa-2x mr-2"></i>Link 3</MDBLink>
            <MDBLink to="#!"><i className="fas fa-chess fa-2x mr-2"></i>Link 3</MDBLink>
            <MDBLink to="#!"><i className="fas fa-chess fa-2x mr-2"></i>Link 3</MDBLink>
            <MDBLink to="#!"><i className="fas fa-chess fa-2x mr-2"></i>Link 3</MDBLink>
            <MDBLink to="#!"><i className="fas fa-chess fa-2x mr-2"></i>Link 3</MDBLink>
            <MDBLink to="#!"><i className="fas fa-chess fa-2x mr-2"></i>Link 3</MDBLink>
            <MDBLink to="#!"><i className="fas fa-chess fa-2x mr-2"></i>Link 3</MDBLink>
          </MDBNav>
        </MDBModal>
      </div>
    );
  }
}

export default SideBar;

// import React from "react";
// import {
//   MDBNavbar,
//   MDBNavbarBrand,
//   MDBNavbarNav,
//   MDBNavItem,
//   MDBCollapse,
//   MDBNavbarToggler,
//   MDBDropdown,
//   MDBDropdownToggle,
//   MDBDropdownMenu,
//   MDBDropdownItem,
//   MDBIcon
// } from 'mdbreact';
// import "./sideBarStyle.css";

// class SideBar extends React.Component  {
//   state = {
//     collapseID: ''
//   };

//   toggleCollapse = collapseID => () =>
//     this.setState(prevState => ({
//       collapseID: prevState.collapseID !== collapseID ? collapseID : ''
//     }));

//   render() {
//     const { isOpen, collapseID } = this.state;
//     return (
//       <>
//           <MDBNavbar 
//             color="indigo"
//             dark
//             expand='md'
//             fixed-top
//             scrolling     
//             id="NavBar"      
//           >
//             <MDBNavbarBrand>
//       {/* TODO логотип та красивий шрифт */}
//               <strong className='white-text'><img src="logo.png" id="logo"/>EJournal</strong>
//             </MDBNavbarBrand>
//             <MDBNavbarToggler
//               onClick={this.toggleCollapse('navbarCollapse3')}
//             />  
//             <MDBCollapse id='navbarCollapse3' isOpen={collapseID} navbar>
//               <MDBNavbarNav right>
//               <MDBNavItem>
//               <MDBDropdown>
//                   <MDBDropdownToggle id="dropDown1" className='dopdown-toggle' nav>
//       {/* TODO динамічно підтягувати кількість нових новин та стислу інформацію*/}
//                     1<MDBIcon id="News" icon='bell' className='ml-1'/>
//                   </MDBDropdownToggle>
//       {/* TODO красиві dropdown */}
//                     <MDBDropdownMenu className='dropdown-default' right>
//       {/* TODO динамічно підтягувати стислу інформацію*/}
//                       <MDBDropdownItem href='#!'>Something new</MDBDropdownItem>
//                     </MDBDropdownMenu>
//                   </MDBDropdown>
//                 </MDBNavItem>
//                 <MDBNavItem>
//                   <MDBDropdown>
//                     <MDBDropdownToggle className='dopdown-toggle' nav>
//                       <img
//       // TODO  динамічно підтягувати імейдж юзера 
//                         src='https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg'
//                         className='rounded-circle z-depth-0'
//                         alt=''
//                         id="profileImage"
//                       />
//                     </MDBDropdownToggle>
//                     <MDBDropdownMenu id="dropMenu1" className='dropdown-default' right>
//       {/* TODO перекидувати на те куди потрібно*/}
//                       <MDBDropdownItem href='#!'><MDBIcon icon='fas fa-user' className='ml-1'/> My account</MDBDropdownItem>
//                       <MDBDropdownItem href='#!'><MDBIcon icon='fas fa-cog' className='ml-1'/> Settings</MDBDropdownItem>
//                       <MDBDropdownItem href='#!'><MDBIcon icon='fas fa-sign-out-alt' className='ml-1'/> Log out</MDBDropdownItem>
//                     </MDBDropdownMenu>
//                   </MDBDropdown>
//                 </MDBNavItem>
//               </MDBNavbarNav>
//             </MDBCollapse>
//           </MDBNavbar>
//       </>
//     );
//   }
// }

// export default SideBar;