import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Button, Card, Col, DatePicker, Form, Input, Layout, List, Menu, Modal, Row, Select, Statistic, Table, Tag, TimePicker, Typography } from 'antd';
import { HomeOutlined, MoonOutlined, MedicineBoxOutlined, ReadOutlined, UserOutlined, LogoutOutlined, DownloadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import 'antd/dist/reset.css';
import './styles.css';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const starterSleep = [
  { id: 1, date: '2026-09-20', bed: '23:10', wake: '07:15', quality: '良好', note: '睡得比较稳' },
  { id: 2, date: '2026-09-21', bed: '00:10', wake: '07:00', quality: '一般', note: '偏晚入睡' },
  { id: 3, date: '2026-09-22', bed: '22:50', wake: '06:50', quality: '优秀', note: '睡眠比较规律' }
];

const starterMeds = [
  { id: 1, name: '米诺地尔', dosage: '5%', times: ['08:00', '20:00'], notes: '外用，按说明使用' },
  { id: 2, name: '维生素B族', dosage: '1片', times: ['08:30'], notes: '饭后服用' }
];

const articles = [
  ['脱发的主要原因分析', '脱发原因', '遗传、压力、熬夜和营养不均衡都可能影响头发健康。'],
  ['睡眠与头发生长的关系', '生活习惯', '建议规律作息，每晚尽量保持 7 至 8 小时睡眠。'],
  ['科学管理防脱用药', '用药指南', '请遵守医嘱用药，记录使用情况，出现不适及时咨询医生。']
];

const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; } };

export default function App() {
  const [user, setUser] = useState(() => read('hair_user', null));
  const [sleep, setSleep] = useState(() => read('hair_sleep', starterSleep));
  const [meds, setMeds] = useState(() => read('hair_meds', starterMeds));
  useEffect(() => localStorage.setItem('hair_sleep', JSON.stringify(sleep)), [sleep]);
  useEffect(() => localStorage.setItem('hair_meds', JSON.stringify(meds)), [meds]);
  if (!user) return <Login onLogin={(values) => { const next = { name: values.name, email: values.email }; setUser(next); localStorage.setItem('hair_user', JSON.stringify(next)); }} />;
  return <BrowserRouter><Shell user={user} logout={() => { setUser(null); localStorage.removeItem('hair_user'); }} sleep={sleep} setSleep={setSleep} meds={meds} setMeds={setMeds} /></BrowserRouter>;
}

function Login({ onLogin }) {
  const [form] = Form.useForm();
  return <div className="login-page"><Card className="login-card"><Title level={2}>防脱发健康管理平台</Title><Text type="secondary">记录睡眠 · 管理用药 · 关注头皮健康</Text><Form form={form} layout="vertical" onFinish={onLogin} className="login-form"><Form.Item name="name" label="昵称" rules={[{ required: true, message: '请输入昵称' }]}><Input placeholder="例如：小王" /></Form.Item><Form.Item name="email" label="邮箱" rules={[{ required: true, message: '请输入邮箱' }]}><Input placeholder="example@email.com" /></Form.Item><Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}><Input.Password /></Form.Item><Button type="primary" htmlType="submit" block>进入平台</Button></Form></Card></div>;
}

function Shell({ user, logout, sleep, setSleep, meds, setMeds }) {
  const location = useLocation();
  const selected = location.pathname === '/' ? 'home' : location.pathname.slice(1);
  const items = [
    { key: 'home', icon: <HomeOutlined />, label: <Link to="/">首页</Link> },
    { key: 'sleep', icon: <MoonOutlined />, label: <Link to="/sleep">睡眠打卡</Link> },
    { key: 'medication', icon: <MedicineBoxOutlined />, label: <Link to="/medication">服药提醒</Link> },
    { key: 'articles', icon: <ReadOutlined />, label: <Link to="/articles">科普内容</Link> },
    { key: 'profile', icon: <UserOutlined />, label: <Link to="/profile">个人中心</Link> }
  ];
  return <Layout className="app-layout"><Sider className="sidebar"><div className="brand"><b>发</b><span>防脱管理<br /><small>健康打卡平台</small></span></div><Menu theme="dark" mode="inline" selectedKeys={[selected]} items={items} /><Button className="logout" icon={<LogoutOutlined />} onClick={logout}>退出登录</Button></Sider><Layout><Header className="topbar"><Title level={4}>欢迎回来，{user.name}</Title><Text>{user.email}</Text></Header><Content className="content"><Routes><Route path="/" element={<Dashboard sleep={sleep} meds={meds} user={user} />} /><Route path="/sleep" element={<SleepPage sleep={sleep} setSleep={setSleep} />} /><Route path="/medication" element={<MedicationPage meds={meds} setMeds={setMeds} />} /><Route path="/articles" element={<Articles />} /><Route path="/profile" element={<Profile user={user} sleep={sleep} meds={meds} />} /><Route path="*" element={<Navigate to="/" />} /></Routes></Content></Layout></Layout>;
}

function Dashboard({ sleep, meds, user }) {
  const avg = useMemo(() => sleep.length ? (sleep.reduce((sum, r) => { let [bh,bm] = r.bed.split(':').map(Number), [wh,wm] = r.wake.split(':').map(Number); let minutes = wh*60+wm-bh*60-bm; if (minutes < 0) minutes += 1440; return sum + minutes/60; }, 0)/sleep.length).toFixed(1) : 0, [sleep]);
  return <>
    <Row gutter={[16,16]}>
      {[
        ['平均睡眠时长', avg, 'h'],
        ['打卡天数', sleep.length, '天'],
        ['用药计划', meds.length, '项'],
        ['当前状态', '持续改善', '']
      ].map(([title,value,suffix]) => <Col xs={24} sm={12} lg={6} key={title}><Card><Statistic title={title} value={value} suffix={suffix} /></Card></Col>)}
    </Row>
    <Row gutter={[16,16]} className="section">
      <Col xs={24} lg={14}><Card title="睡眠趋势"><div className="chart">{sleep.map((r) => <div className="bar-item" key={r.id}><div className="bar" style={{ height: `${Math.min(95, 35 + Number(r.wake.slice(0,2)) * 6)}%` }} /><span>{r.date.slice(5)}</span></div>)}</div></Card></Col>
      <Col xs={24} lg={10}><Card title="今日提醒"><List dataSource={['晚上 22:30 记录睡眠', '早上 08:00 查看用药计划', '保持规律作息']} renderItem={(item) => <List.Item><Tag color="green">{item}</Tag></List.Item>} /></Card></Col>
    </Row>
    <Card title="个人档案"><p>用户名：{user.name}</p><p>邮箱：{user.email}</p><p>建议：保持规律睡眠，如有持续脱发请咨询皮肤科医生。</p></Card>
  </>;
}

function SleepPage({ sleep, setSleep }) {
  const [form] = Form.useForm();
  const submit = (v) => {
    setSleep([
      {
        id: Date.now(),
        date: dayjs(v.date).format('YYYY-MM-DD'),
        bed: dayjs(v.bed).format('HH:mm'),
        wake: dayjs(v.wake).format('HH:mm'),
        quality: v.quality || '良好',
        note: v.note || ''
      },
      ...sleep
    ]);
    form.resetFields();
  };
  const columns = [
    { title: '日期', dataIndex: 'date' },
    { title: '入睡', dataIndex: 'bed' },
    { title: '起床', dataIndex: 'wake' },
    { title: '质量', dataIndex: 'quality' },
    { title: '备注', dataIndex: 'note' }
  ];
  return (
    <Row gutter={[16,16]}>
      <Col xs={24} lg={9}>
        <Card title="睡眠打卡">
          <Form form={form} layout="vertical" onFinish={submit}>
            <Form.Item name="date" label="日期" rules={[{required:true}]}>
              <DatePicker style={{width:'100%'}} />
            </Form.Item>
            <Form.Item name="bed" label="入睡时间" rules={[{required:true}]}>
              <TimePicker style={{width:'100%'}} format="HH:mm" />
            </Form.Item>
            <Form.Item name="wake" label="起床时间" rules={[{required:true}]}>
              <TimePicker style={{width:'100%'}} format="HH:mm" />
            </Form.Item>
            <Form.Item name="quality" label="睡眠质量">
              <Select defaultValue="良好" options={['优秀','良好','一般','较差'].map(x => ({label:x,value:x}))} />
            </Form.Item>
            <Form.Item name="note" label="备注">
              <Input.TextArea rows={3} />
            </Form.Item>
            <Button type="primary" htmlType="submit" block>提交睡眠打卡</Button>
          </Form>
        </Card>
      </Col>
      <Col xs={24} lg={15}>
        <Card title="睡眠记录">
          <Table dataSource={sleep} columns={columns} rowKey="id" pagination={{pageSize:5}} />
        </Card>
      </Col>
    </Row>
  );
}

function MedicationPage({ meds, setMeds }) {
  const [open,setOpen] = useState(false);
  const [form] = Form.useForm();
  const add = (v) => {
    setMeds([{id:Date.now(), name:v.name, dosage:v.dosage, times:v.times, notes:v.notes || ''}, ...meds]);
    form.resetFields();
    setOpen(false);
  };
  return (
    <Card title="服药提醒" extra={<Button type="primary" onClick={() => setOpen(true)}>新增计划</Button>}>
      <Row gutter={[16,16]}>
        {meds.map(m => (
          <Col xs={24} md={12} lg={8} key={m.id}>
            <Card>
              <Title level={5}>{m.name} <Tag color="green">进行中</Tag></Title>
              <p>剂量：{m.dosage}</p>
              <p>提醒时间：{m.times.join('、')}</p>
              <p>说明：{m.notes}</p>
              <Button block onClick={() => window.alert(`已记录：${m.name}`)}>标记已服药</Button>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal title="新增用药计划" open={open} onCancel={() => setOpen(false)} footer={null}>
        <Form form={form} layout="vertical" onFinish={add}>
          <Form.Item name="name" label="药品名称" rules={[{required:true}]}><Input /></Form.Item>
          <Form.Item name="dosage" label="剂量" rules={[{required:true}]}><Input /></Form.Item>
          <Form.Item name="times" label="提醒时间" rules={[{required:true}]}>
            <Select mode="tags" placeholder="输入时间后按回车，例如 08:00" />
          </Form.Item>
          <Form.Item name="notes" label="说明"><Input.TextArea /></Form.Item>
          <Button type="primary" htmlType="submit" block>保存计划</Button>
        </Form>
      </Modal>
    </Card>
  );
}

function Articles() {
  return (
    <Row gutter={[16,16]}>
      {articles.map(([title,category,content]) => (
        <Col xs={24} md={12} lg={8} key={title}>
          <Card title={title} extra={<Tag color="cyan">{category}</Tag>}>
            <p>{content}</p>
            <Text type="secondary">作者：健康科普内容组</Text>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

function Profile({ user, sleep, meds }) {
  const exportData = () => {
    const blob = new Blob([JSON.stringify({user,sleep,meds},null,2)], {type:'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'health-report.json';
    a.click();
    URL.revokeObjectURL(a.href);
  };
  return (
    <Card title="个人中心">
      <p>姓名：{user.name}</p>
      <p>邮箱：{user.email}</p>
      <p>睡眠记录：{sleep.length} 条</p>
      <p>用药计划：{meds.length} 项</p>
      <Button icon={<DownloadOutlined />} type="primary" onClick={exportData}>导出健康报告</Button>
    </Card>
  );
}

export default App;
