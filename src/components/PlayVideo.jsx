import React, { useState, useEffect, useRef, useContext } from 'react';
import { Layout, Avatar, Button, List, Divider, Input, Typography } from 'antd';
import {
    LikeOutlined,
    DislikeOutlined,
    ShareAltOutlined,
    SaveOutlined,
    UserOutlined,
    BellOutlined,
    CommentOutlined,
    FullscreenOutlined,
} from '@ant-design/icons';
import { YoutubeContext } from '../context/YotubeContext';
import Recomended from './Recomended';
import Loader from './Loader';
import { API_KEY, formatTime, value_converter } from '../data';
import simon from '../assets/simon.png'

const { Content, Sider } = Layout;
const { TextArea } = Input;
const { Title, Paragraph } = Typography;

const Play = ({ videoId, categoryId }) => {
    const { apidata, setApiData } = useContext(YoutubeContext);
    const [comments, setComments] = useState([
        { user: 'Dilmurod Mamurov', text: 'Great explanation, very helpful content!', likes: 244, time: '1 day ago', liked: false, replies: [] },
        { user: 'Jack Sparrow', text: 'Well structured and easy to understand.', likes: 120, time: '2 days ago', liked: false, replies: [] },
    ]);

    const [newComment, setNewComment] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const iframeRef = useRef(null);
    const [replyText, setReplyText] = useState('');
    const [visibleReplyIndex, setVisibleReplyIndex] = useState(null);
    const [channelDate, setChannelDate] = useState(null);

    const fetchData = async () => {
        const apiUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (data.items && data.items.length > 0) {
                setApiData(data.items[0]);
            } else {
                setApiData(null);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setApiData(null);
            setLoading(false);
        }
    };

    const fetchOtherData = async () => {
        const channelDate_url = `https://youtube.googleapis.com/youtube/v3/channels?key=${API_KEY}&part=snippet%2CcontentDetails%2Cstatistics&id=${apidata.snippet.channelId}`;
        await fetch(channelDate_url).then(res => res.json()).then(data => setChannelDate(data.items[0]));
    }

    useEffect(() => {
        fetchData();
    }, [videoId]);

    useEffect(() => {
        fetchOtherData();
    }, [apidata]);

    const handleAddComment = () => {
        if (newComment.trim()) {
            const updatedComments = [
                ...comments,
                { user: 'New User', text: newComment, likes: 0, time: 'Just now', liked: false, replies: [] },
            ];
            setComments(updatedComments);
            setNewComment('');
        }
    };

    const handleLike = (index) => {
        const updatedComments = [...comments];
        if (updatedComments[index].liked) {
            updatedComments[index].likes -= 1;
        } else {
            updatedComments[index].likes += 1;
        }
        updatedComments[index].liked = !updatedComments[index].liked;
        setComments(updatedComments);
        sortComments(updatedComments); // Sort comments after like/dislike
    };

    const handleSubscribe = () => {
        setSubscribed(!subscribed);
    };

    const toggleFullscreen = () => {
        if (iframeRef.current) {
            if (isFullscreen) {
                document.exitFullscreen();
            } else {
                iframeRef.current.requestFullscreen();
            }
            setIsFullscreen(!isFullscreen);
        }
    };

    const handleAddReply = (commentIndex) => {
        if (replyText.trim()) {
            const updatedComments = [...comments];
            updatedComments[commentIndex].replies.push({
                user: 'New User',
                text: replyText,
                likes: 0,
                time: 'Just now',
                liked: false,
            });
            setComments(updatedComments);
            setReplyText('');
            setVisibleReplyIndex(null);
            sortReplies(updatedComments, commentIndex); // Sort replies after adding
        }
    };

    const handleReplyClick = (commentIndex) => {
        setVisibleReplyIndex(commentIndex === visibleReplyIndex ? null : commentIndex);
    };

    const sortComments = (updatedComments) => {
        updatedComments.sort((a, b) => b.likes - a.likes); // Sort comments by likes in descending order
        setComments(updatedComments);
    };

    const sortReplies = (updatedComments, commentIndex) => {
        updatedComments[commentIndex].replies.sort((a, b) => b.likes - a.likes); // Sort replies by likes
        setComments(updatedComments);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="max-w-[1320px] mx-auto mt-[70px]">
            <Layout style={{ minHeight: '100vh', backgroundColor: 'white' }}>
                <Content style={{ padding: '10px' }}>
                    <div className="flex flex-col gap-8 md:flex-row">
                        <div className="flex-1">
                            <div className="relative">
                                <iframe
                                    ref={iframeRef}
                                    className="w-full md:w-[900px] h-[500px] md:h-[600px] rounded-lg shadow-lg"
                                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                                    title={apidata.snippet.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                />
                                <Button
                                    icon={<FullscreenOutlined />}
                                    onClick={toggleFullscreen}
                                    className="absolute z-10 top-2 right-2"
                                    size="large"
                                    shape="circle"
                                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white' }}
                                />
                            </div>
                            <Title level={4} className="mt-4 font-bold">{apidata.snippet.title}</Title>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-500">
                                    {`${value_converter(apidata.statistics.viewCount)} views • `}
                                    <span className="text-gray-400">
                                        {formatTime(apidata.snippet.publishedAt)}
                                    </span>
                                </span>
                                <div className="flex gap-3">
                                    <Button
                                        icon={<LikeOutlined />}
                                        size="middle"
                                        className="flex items-center text-gray-500"
                                        onClick={() => handleLike(0)}
                                    >
                                        {apidata ? value_converter(apidata.statistics.likeCount) : 15}
                                    </Button>
                                    <Button icon={<DislikeOutlined />} size="middle" />
                                    <Button icon={<ShareAltOutlined />} size="middle">Share</Button>
                                    <Button icon={<SaveOutlined />} size="middle">Save</Button>
                                </div>
                            </div>
                            <Divider />
                            <div className="flex items-center gap-4">
                                <img src={channelDate?.snippet?.thumbnails?.default?.url || simon} alt="" className="w-12 h-12 rounded-full" />
                                <div>
                                    <p className="font-semibold">{apidata?.snippet?.channelTitle || "No channel title"}</p>
                                    <span className="text-gray-500">{channelDate ? value_converter(channelDate.statistics?.subscriberCount) : "1M"} subscribers</span>
                                </div>
                                <Button type={subscribed ? 'default' : 'primary'} icon={<BellOutlined />} onClick={handleSubscribe}>
                                    {subscribed ? 'Subscribed' : 'Subscribe'}
                                </Button>
                            </div>
                            <Divider />
                            <Paragraph>
                                {apidata?.snippet?.description.slice(0, 250) || "No description available"}
                            </Paragraph>
                            <Divider />
                            <Title level={5}>{comments.length} comments</Title>
                            <TextArea
                                rows={2}
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <Button type="primary" onClick={handleAddComment} className="mt-2">Post Comment</Button>
                            <Divider />
                            <List
                                dataSource={comments}
                                renderItem={(comment, index) => (
                                    <List.Item key={index}>
                                        <div className="flex gap-3">
                                            <Avatar icon={<UserOutlined />} size={50} />
                                            <div>
                                                <p className="font-semibold">{comment.user}</p>
                                                <span className="text-gray-500">{comment.time}</span>
                                            </div>
                                        </div>
                                        <p className="mt-2">{comment.text}</p>
                                        <div className="flex gap-3">
                                            <Button
                                                icon={<LikeOutlined />}
                                                onClick={() => handleLike(index)}
                                                className={`${comment.liked ? 'text-blue-500' : 'text-gray-500'}`}
                                            >
                                                {comment.liked ? '❤️' : '👍'} {comment.likes}
                                            </Button>
                                            <Button icon={<CommentOutlined />} onClick={() => handleReplyClick(index)}>
                                                {comment.replies.length} Reply
                                            </Button>
                                        </div>
                                        {visibleReplyIndex === index && (
                                            <div className="mt-2">
                                                <TextArea
                                                    rows={2}
                                                    placeholder="Add a reply..."
                                                    value={replyText}
                                                    onChange={(e) => setReplyText(e.target.value)}
                                                />
                                                <Button type="primary" onClick={() => handleAddReply(index)} className="mt-2">Reply</Button>
                                            </div>
                                        )}
                                        {comment.replies.length > 0 && (
                                            <div className="pl-6 mt-2">
                                                {comment.replies.map((reply, replyIndex) => (
                                                    <div key={replyIndex} className="flex gap-3 mb-2">
                                                        <Avatar icon={<UserOutlined />} size={40} />
                                                        <div>
                                                            <p className="font-semibold">{reply.user}</p>
                                                            <span className="text-gray-500">{reply.time}</span>
                                                            <p>{reply.text}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </List.Item>
                                )}
                            />
                        </div>
                        <Sider width={450} className="p-4 bg-white shadow-md" style={{ borderLeft: '1px solid #eaeaea' }}>
                            <Recomended categoryId={categoryId} />
                        </Sider>
                    </div>
                </Content>
            </Layout>
        </div>
    );
};

export default Play;
