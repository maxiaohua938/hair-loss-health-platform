import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Button, Card, Col, DatePicker, Form, Input, Layout, List, Menu, Modal, Row, Select, Table, Tag, TimePicker, Typography } from 'antd';
import { HomeOutlined, MoonOutlined, MedicineBoxOutlined, ReadOutlined, UserOutlined, LogoutOutlined, DownloadOutlined, DeleteOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import 'antd/dist/reset.css';
import './styles.css';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;
const defaultUser = { name: '小花', email: 'm_xh200711@qq.com', gender: '女', age: 29, hairLossStatus: '轻度脱发' };
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
  { title: '脱发的主要原因分析', category: '脱发原因', summary: '遗传、压力、熬夜和营养不均衡都可能影响头发健康。', detail: '头发健康受到遗传、激素、营养、睡眠和心理压力等多重因素影响。建议保持规律作息，必要时咨询皮肤科医生。' },
  { title: '睡眠与头发生长的关系', category: '生活习惯', summary: '建议规律作息，每晚尽量保持 7 至 8 小时睡眠。', detail: '睡眠不足会影响身体修复和头皮状态。保持稳定的睡眠周期，有助于维持整体健康。' },
  { title: '科学管理防脱用药', category: '用药指南', summary: '请遵守医嘱用药，记录使用情况，出现不适及时咨询医生。', detail: '不同药物作用机制不同，请根据药品说明和医生建议使用，不要自行增减剂量。' },
  { title: '头皮护理的正确方法', category: '护发技巧', summary: '温和清洁、减少高温吹风，帮助维持头皮健康状态。', detail: '选择温和洗护产品，减少频繁烫染和高温吹风，保持头皮清洁并注意压力管理。' }
];
const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };

export default function App() {
  const [user, setUser] = useState(() => read('hair_user', defaultUser));
  const [sleep, setSleep] = useState(() => read('hair_sleep', starterSleep));
  const [meds, setMeds] = useState(() => read('hair_meds', starterMeds));
  useEffect(() => { if (user) localStorage.setItem('hair_user', JSON.stringify(user)); }, [user]);
  useEffect(() => localStorage.setItem('hair_sleep', JSON.stringify(sleep)), [sleep]);
  useEffect(() => localStorage.setItem('hair_meds', JSON.stringify(meds)), [meds]);
  const logout = () => { setUser(null); localStorage.removeItem('hair_user'); };
  return <BrowserRouter>{user ? <Shell user={user} logout={logout} sleep={sleep} setSleep={setSleep} meds={meds} setMeds={setMeds} /> : <Login onLogin={v => setUser({ ...defaultUser, name: v.name || defaultUser.name, email: v.email || defaultUser.email })} />}</BrowserRouter>;
}

function Login({ onLogin }) {
  const [form] = Form.useForm();
  const [register, setRegister] = useState(false);
  return <div className="login-page"><div className="login-card"><div className="login-head"><Title level={2}>防脱发健康管理平台</Title><Text type="secondary">记录睡眠 · 管理用药 · 关注头皮健康</Text></div><div className="login-toggle"><Button type={!register ? 'primary' : 'default'} onClick={() => setRegister(false)}>登录</Button><Button type={register ? 'primary' : 'default'} onClick={() => setRegister(true)}>注册</Button></div><Form form={form} layout="vertical" onFinish={onLogin}>{register && <Form.Item name="name" label="昵称" rules={[{ required: true, message: '请输入昵称' }]}><Input placeholder="例如：小花" /></Form.Item>}<Form.Item name="email" label="邮箱" rules={[{ required: true, message: '请输入邮箱' }]}><Input placeholder="example@email.com" /></Form.Item><Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}><Input.Password /></Form.Item><Button type="primary" htmlType="submit" block>{register ? '创建账号' : '进入平台'}</Button></Form></div></div>;
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
  return <Layout className="app-layout"><Sider className="sidebar"><div className="brand-wrap"><div className="brand-icon">发</div><div><div className="brand-title">防脱管理</div><div className="brand-sub">健康打卡平台</div></div></div><Menu theme="dark" mode="inline" selectedKeys={[selected]} items={items} className="main-menu" /><Button className="logout-btn" icon={<LogoutOutlined />} onClick={logout}>退出登录</Button></Sider><Layout><Header className="topbar"><Title level={4} style={{ margin: 0 }}>欢迎回来，{user.name}</Title><Text type="secondary">{user.email}</Text></Header><Content className="content-area"><Routes><Route path="/" element={<Dashboard sleep={sleep} meds={meds} user={user} />} /><Route path="/sleep" element={<SleepPage sleep={sleep} setSleep={setSleep} />} /><Route path="/medication" element={<MedicationPage meds={meds} setMeds={setMeds} />} /><Route path="/articles" element={<Articles />} /><Route path="/profile" element={<Profile user={user} sleep={sleep} meds={meds} />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></Content></Layout></Layout>;
}

function hours(record) { const [bh, bm] = record.bed.split(':').map(Number); const [wh, wm] = record.wake.split(':').map(Number); let mins = wh * 60 + wm - bh * 60 - bm; if (mins < 0) mins += 1440; return mins / 60; }
function Dashboard({ sleep, meds, user }) {
  const avg = useMemo(() => sleep.length ? (sleep.reduce((sum, item) => sum + hours(item), 0) / sleep.length).toFixed(1) : '0.0', [sleep]);
  return <><div className="dashboard-header">欢迎回来，{user.name}</div><Row gutter={[16, 16]}>{[['平均睡眠时长', `${avg} h`], ['打卡天数', `${sleep.length} 天`], ['用药计划', `${meds.length} 项`], ['当前状态', '持续改善']].map(([label, value]) => <Col xs={24} sm={12} lg={6} key={label}><Card className="stat-card"><div className="stat-label">{label}</div><div className="stat-value">{value}</div></Card></Col>)}</Row><Row gutter={[16, 16]} className="section-block"><Col xs={24} lg={14}><Card className="panel-card" title="睡眠趋势"><div className="chart-box">{sleep.map(item => <div className="chart-item" key={item.id}><div className="chart-bar" style={{ height: `${Math.min(92, Math.max(28, hours(item) * 9)}%` }} /><span>{item.date.slice(5)}</span></div>)}</div></Card></Col><Col xs={24} lg={10}><Card className="panel-card" title="今日提醒"><List dataSource={['晚上 22:30 记录睡眠', '早上 08:00 查看用药计划', '保持规律作息']} renderItem={item => <List.Item><Tag color="green">{item}</Tag></List.Item>} /></Card></Col></Row><Card className="profile-card" title="个人档案"><p>用户名：{user.name}</p><p>邮箱：{user.email}</p><p>性别：{user.gender || '女'}　年龄：{user.age || 29}</p><p>建议：保持规律睡眠，如有持续脱发请咨询皮肤科医生。</p></Card></>;
}

function SleepPage({ sleep, setSleep }) {
  const [form] = Form.useForm();
  const submit = values => { const item = { id: Date.now(), date: dayjs(values.date).format('YYYY-MM-DD'), bed: dayjs(values.bed).format('HH:mm'), wake: dayjs(values.wake).format('HH:mm'), quality: values.quality || '良好', note: values.note || '' }; setSleep(prev => [item, ...prev]); form.resetFields(); };
  const columns = [{ title: '日期', dataIndex: 'date' }, { title: '入睡', dataIndex: 'bed' }, { title: '起床', dataIndex: 'wake' }, { title: '质量', dataIndex: 'quality' }, { title: '备注', dataIndex: 'note' }];
  return <Row gutter={[16, 16]}><Col xs={24} lg={9}><Card className="panel-card" title="睡眠打卡"><Form form={form} layout="vertical" onFinish={submit}><Form.Item name="date" label="日期" rules={[{ required: true, message: '请选择日期' }]}><DatePicker style={{ width: '100%' }} /></Form.Item><Form.Item name="bed" label="入睡时间" rules={[{ required: true, message: '请选择时间' }]}><TimePicker style={{ width: '100%' }} format="HH:mm" /></Form.Item><Form.Item name="wake" label="起床时间" rules={[{ required: true, message: '请选择时间' }]}><TimePicker style={{ width: '100%' }} format="HH:mm" /></Form.Item><Form.Item name="quality" label="睡眠质量" initialValue="良好"><Select options={['优秀', '良好', '一般', '较差'].map(x => ({ label: x, value: x }))} /></Form.Item><Form.Item name="note" label="备注"><Input.TextArea rows={3} /></Form.Item><Button type="primary" htmlType="submit" block>提交睡眠打卡</Button></Form></Card></Col><Col xs={24} lg={15}><Card className="panel-card" title="睡眠记录"><Table dataSource={sleep} columns={columns} rowKey="id" pagination={{ pageSize: 5 }} /></Card></Col></Row>;
}

function MedicationPage({ meds, setMeds }) {
  const [open, setOpen] = useState(false); const [form] = Form.useForm();
  const add = values => { setMeds(prev => [{ id: Date.now(), name: values.name, dosage: values.dosage, times: Array.isArray(values.times) ? values.times : [values.times], notes: values.notes || '', status: '进行中' }, ...prev]); form.resetFields(); setOpen(false); };
  return <Card className="panel-card" title="服药提醒" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>新增计划</Button>}><Row gutter={[16, 16]}>{meds.map(m => <Col xs={24} md={12} lg={8} key={m.id}><Card className="med-card"><div className="med-header"><Title level={5} style={{ margin: 0 }}>{m.name}</Title><Tag color="green">{m.status || '进行中'}</Tag></div><div className="med-body"><p>剂量：{m.dosage}</p><p>提醒时间：{(m.times || []).join('、')}</p><p>说明：{m.notes || '按说明使用'}</p></div><div className="med-actions"><Button block onClick={() => window.alert(`已记录：${m.name}`)}>标记已服药</Button><Button danger block icon={<DeleteOutlined />} onClick={() => setMeds(prev => prev.filter(x => x.id !== m.id))}>删除</Button></div></Card></Col>)}</Row><Modal title="新增用药计划" open={open} onCancel={() => setOpen(false)} footer={null}><Form form={form} layout="vertical" onFinish={add}><Form.Item name="name" label="药品名称" rules={[{ required: true }]}><Input /></Form.Item><Form.Item name="dosage" label="剂量" rules={[{ required: true }]}><Input /></Form.Item><Form.Item name="times" label="提醒时间" rules={[{ required: true }]}><Select mode="tags" placeholder="例如：08:00、20:00" /></Form.Item><Form.Item name="notes" label="说明"><Input.TextArea /></Form.Item><Button type="primary" htmlType="submit" block>保存计划</Button></Form></Modal></Card>;
}

function Articles() { const [selected, setSelected] = useState(null); return <><Row gutter={[16, 16]}>{articles.map(item => <Col xs={24} md={12} lg={8} key={item.title}><Card className="panel-card" title={item.title} extra={<Tag color="cyan">{item.category}</Tag>}><p className="article-summary">{item.summary}</p><Button type="link" icon={<EyeOutlined />} onClick={() => setSelected(item)}>阅读详情</Button></Card></Col>)}</Row><Modal title={selected?.title} open={!!selected} onCancel={() => setSelected(null)} footer={<Button onClick={() => setSelected(null)}>关闭</Button>}>{selected && <><Tag color="cyan">{selected.category}</Tag><p>{selected.detail}</p></>}</Modal></>; }

function Profile({ user, sleep, meds }) {
  const [form] = Form.useForm(); const [editing, setEditing] = useState(false);
  useEffect(() => form.setFieldsValue(user), [user, form]);
  const save = values => { localStorage.setItem('hair_user', JSON.stringify({ ...user, ...values })); window.location.reload(); };
  const exportData = () => { const blob = new Blob([JSON.stringify({ user, sleep, meds }, null, 2)], { type: 'application/json' }); const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'health-report.json'; link.click(); URL.revokeObjectURL(link.href); };
  return <Card className="panel-card" title="个人中心" extra={<Button onClick={() => setEditing(v => !v)}>{editing ? '取消编辑' : '编辑资料'}</Button>}>{editing ? <Form form={form} layout="vertical" onFinish={save}><Form.Item name="name" label="姓名"><Input /></Form.Item><Form.Item name="email" label="邮箱"><Input /></Form.Item><Form.Item name="gender" label="性别"><Select options={['女', '男', '其他'].map(x => ({ label: x, value: x }))} /></Form.Item><Form.Item name="age" label="年龄"><Input type="number" /></Form.Item><Form.Item name="hairLossStatus" label="脱发状态"><Select options={['轻度脱发', '中度脱发', '重度脱发'].map(x => ({ label: x, value: x }))} /></Form.Item><Button type="primary" htmlType="submit">保存修改</Button></Form> : <><p>姓名：{user.name}</p><p>邮箱：{user.email}</p><p>性别：{user.gender || '女'}</p><p>年龄：{user.age || 29}</p><p>脱发状态：{user.hairLossStatus || '轻度脱发'}</p><p>睡眠记录：{sleep.length} 条</p><p>用药计划：{meds.length} 项</p><Button type="primary" icon={<DownloadOutlined />} onClick={exportData}>导出健康报告</Button></>}</Card>;
}
