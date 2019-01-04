import * as React from 'react'
import {inject, observer} from 'mobx-react'
import { Row, Col, Form, Icon, Input, Button, DatePicker, Table, Modal, Badge, } from 'antd';
import { ColumnProps } from 'antd/lib/table'
import { IBall } from '@models/ball'

const FormItem = Form.Item;


@inject('ballListStore')
@observer
export default class BallList extends React.Component<IProps> {

  state = {
    modalTitle: '参数详情',
    visible: false,
    modalTxt: '',
    visibleLog: false,
    detailInfo: {}
  }

  columns: ColumnProps<IBall>[] = [{
    title: '期号',
    dataIndex: 'issue',
    // width: '15%',
  }, {
    title: '红球号码',
    children: [{
      title: '1',
      dataIndex: 'red1',
      render: (text: number, record: IBall, index: number) => this.setColor(text, 'red')
    },{
      title: '2',
      dataIndex: 'red2',
      render: (text: number, record: IBall, index: number) => this.setColor(text, 'red')
    },{
      title: '3',
      dataIndex: 'red3',
      render: (text: number, record: IBall, index: number) => this.setColor(text, 'red')
    },{
      title: '4',
      dataIndex: 'red4',
      render: (text: number, record: IBall, index: number) => this.setColor(text, 'red')
    },{
      title: '5',
      dataIndex: 'red5',
      render: (text: number, record: IBall, index: number) => this.setColor(text, 'red')
    },{
      title: '6',
      dataIndex: 'red6',
      render: (text: number, record: IBall, index: number) => this.setColor(text, 'red')
    }]
  }, {
    title: '一等奖',
    children: [{
      title: '注数',
      dataIndex: 'prizeOneNum'
    },{
      title: '奖金(元)',
      dataIndex: 'prizeOne'
    }]
  }, {
    title: '二等奖',
    children: [{
      title: '注数',
      dataIndex: 'prizeTwoNum'
    },{
      title: '奖金(元)',
      dataIndex: 'prizeTwo'
    }]
  }, {
    title: '蓝球',
    dataIndex: 'blue',
    render: (text: number, record: IBall, index: number) => this.setColor(text, 'blue')
  }, {
    title: '开奖日期',
    width: '120px',
    dataIndex: 'drawDate',
    key: 'drawDate',
    sorter: true
  }, {
    title: '操作',
    dataIndex: '',
    width: '80px',
    render: (text: string, record: IBall, index: number) => <Button size="small" type="primary" onClick={() => this.viewDetail(record)}>详情</Button>
  }]

  viewDetail(data: IBall) {
    // this.props.history.push(`/home/blog-message/${data.id}`)
  }

  create = () => {
    this.props.history.push('/home/lottery-ballCreate')
  }

  setColor = (num: number, type: string) => {
    if(type === 'red') {
      return <div style={{textAlign: 'center', color: type}}>{num}</div>
    } else {
      return <div style={{textAlign: 'center', color: type}}>{num}</div>
    }
  }
  
  componentDidMount() {
    this.props.ballListStore.search()
  }

  render(){
    const { value, loading, list, meta, drawDate, inputChange, search, clear } = this.props.ballListStore
 
    return <React.Fragment>
      <Form className="search-form">
        <h3>双色球列表</h3>
        <Row gutter={24}>
          <Col span={6}>
            <FormItem>
              <Input placeholder="期号查询，如:(18001,18010)" onChange={e => inputChange(e.target.value, 'orderId')} value={value.orderId}/>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem>
              <DatePicker.RangePicker onChange={(e) => inputChange(e, 'drawDate')} value={drawDate}/>
            </FormItem>
          </Col>
        </Row>
        <Row className="search-btn-w">
          <Col span={24}>
            <Button onClick={clear}>清空</Button>
            <Button onClick={this.create} icon="edit">创建</Button>
            <Button type="primary" onClick={search}>搜索</Button>
          </Col>
        </Row>
      </Form>
      <Table
        bordered
        className="table-list"
        columns={this.columns}
        rowKey={(record: any) => record.id}
        dataSource={list}
        pagination={meta}
        loading={loading}
        onChange={search}
      />
    </React.Fragment>
    
  }
}