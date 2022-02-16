import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Table, Button, Menu, Dropdown, Tag } from 'antd';
import {
  FileTextOutlined,
  DownOutlined,
  GlobalOutlined,
  TeamOutlined,
  UserDeleteOutlined,
  UserOutlined,
  GoldOutlined
} from '@ant-design/icons';
import Swal from "sweetalert2";

import Layout from '../../containers/Layout';
import { Card } from '../../commons';
import { CardBoard } from '../../components';
import { contents } from '../../mock/data';

class DasboardComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  handlePaggination = (start, length) => {
    console.log('params', start, length);
  };

  deleteContent = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "The system is working",
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        console.log("Deleted", id)
      }
    });
  };

  menu = (record) => {
    return (
      <Menu className="menu-dropdown-table">
        <Menu.Item key="0">
          <Button onClick={() => this.props.history.push(`/content/${record.id}`)}>
            Edit
          </Button>
        </Menu.Item>
        <Menu.Item key="1">
          <Button onClick={() => this.deleteContent(record.id)}>
            Delete
          </Button>
        </Menu.Item>
        <Menu.Item key="2">
          <Button onClick={() => console.log('View', record.id)}>View</Button>
        </Menu.Item>
        <Menu.Item key="3">
          <Button onClick={() => console.log('Repost', record.id)}>Repost</Button>
        </Menu.Item>
        <Menu.Item key="4">
          <Button onClick={() => console.log('Duplicate', record.id)}>Duplicate</Button>
        </Menu.Item>
      </Menu>
    )
  }

  render() {
    // const { frozen } = this.props;
    const columns = [
      {
        title: 'No',
        dataIndex: 'id',
        sorter: (a, b) => a.id - b.id,
        sortDirections: ['descend'],
      },
      {
        title: 'Title',
        dataIndex: 'title',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.title.length - b.title.length,
        render: (text, record) => (
          <span dangerouslySetInnerHTML={{ __html: record.title.substring(0, 50) }} />
        ),
      },
      {
        title: 'Url',
        dataIndex: 'website',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.website.length - b.website.length,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.status.length - b.status.length,
        render: status => {
          let color = status === 'active' ? 'geekblue' : 'volcano';
          return (
            <Tag color={color}>
              {status.toUpperCase()}
            </Tag>
          )
        },
      },
      {
        title: 'Group',
        dataIndex: 'group',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.group.length - b.group.length,
      },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: (text, record) => (
          <Dropdown overlay={this.menu(record)} trigger={['click']}>
            <div
              className="ant-dropdown-link d-flex align-items-center cursor-pointer"
            >
              Actions <DownOutlined className="ml-2" />
            </div>
          </Dropdown>
        ),
      },
    ];
    return (
      <Layout>
        <div className="boards-list">
          {/* layout */}
          <Row gutter={[16, 16]} className="mb-4">
            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <CardBoard
                wrapperClass="text-white bg-red h-80"
                title="Offine"
                value="6"
                icon={<UserDeleteOutlined style={{ fontSize: '32px' }}/>}
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <CardBoard
                wrapperClass="text-white bg-success h-80"
                title="Online"
                value="42"
                icon={<UserOutlined style={{ fontSize: '32px' }} />}
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <CardBoard
                wrapperClass="text-white bg-gradient-primary h-80"
                title="Websites"
                value="48"
                icon={<GlobalOutlined style={{ fontSize: '32px' }} />}
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <CardBoard
                wrapperClass="text-white bg-gradient-danger h-80"
                title="Groups"
                value="5"
                icon={<GoldOutlined style={{ fontSize: '32px' }}/>}
              />
            </Col>
          </Row>

          <Card>
            <Table
              rowKey={record => record.id}
              columns={columns}
              dataSource={contents}
              onChange={this.handlePaggination}
              pagination={{
                defaultPageSize: 10,
                showSizeChanger: contents.length <= 10 ? false : true,
                showQuickJumper: true,
                // total: total,
                defaultCurrent: 1,
                onChange: (page, length) => {
                  console.log(page);
                  this.handlePaggination((page - 1) * length, length, "", page, length);
                },
                // showTotal: (total) => `Total ${total} items`,
                pageSizeOptions: ["10", "20", "30"],
                onShowSizeChange: (current, pageSize) => {
                  this.handlePaggination(0 * pageSize, pageSize, "", 1, pageSize);
                }
              }}
            />
          </Card>
        </div>
      </Layout>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     frozen: state.frozen,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     frozenActions: bindActionCreators(frozenActions, dispatch),
//   };
// };

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Frozen));
export default withRouter(DasboardComponent);