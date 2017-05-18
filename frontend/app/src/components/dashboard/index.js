import React, {Component} from 'react';
import './style.css';
import AndroidLogo from '../../assets/android.png';
import WebLogo from '../../assets/html5.png';
import Navbar from '../navbar/index2';
import {NavLink} from 'react-router-dom';

class Dashboard extends Component {
  handleClick() {
    window.location.href = '/home';
  }

  render() {
    return (
      <div className="dashboard">
        <Navbar/>
        <div className="row">
          <div className="col-md-3">
            <ul className="dashboard-menu">
              <li className="dashboard-li">
                <a href="#home">HOME</a>
              </li>
              <li className="dashboard-li">
                <a href="#profile">PROFILE</a>
              </li>
              <li className="dashboard-li">
                <a href="/">LOGOUT</a>
              </li>
            </ul>
          </div>
          <div className="col-md-9">
            <div className="dashboard-content">
              <div className="dashboard-title">Kelas yang tersedia</div>
              <div className="row">
                <div className="col-md-6">
                  <button onClick={this.handleClick} className="dashboard-android-content">
                    <div className="dashboard-content-logo">
                      <img className="dashboard-image-logo" src={AndroidLogo}/>
                    </div>
                    <div className="dashboard-text-title">Android Development</div>
                    <div className="dashboard-text-subtitle">Mempelajari cara membuat aplikasi android dengan menggunakan android studio.</div>
                  </button>
                </div>
                <div className="col-md-6">
                  <button onClick={this.handleClick} className="dashboard-web-content">
                    <div className="dashboard-content-logo">
                      <img className="dashboard-image-logo" src={WebLogo}/>
                    </div>
                    <div className="dashboard-text-title">Web Development</div>
                    <div className="dashboard-text-subtitle">Mempelajari cara membuat website dengan teknologi laravel.</div>
                  </button>
                </div>
              </div>
              <div className="dashboard-subtitle">Kelas yang sedang diikuti</div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th id="schedule-th">Kelas</th>
                    <th id="schedule-th">Batch</th>
                    <th id="schedule-th">Status</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
