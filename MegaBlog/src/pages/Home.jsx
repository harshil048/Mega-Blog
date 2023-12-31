import React, { useEffect, useState } from 'react'
import service from '../appwrite/config';
import { Button, Container, PostCard } from '../components'
import { Link } from 'react-router-dom';
import home from '../assets/home.svg'
import { useSelector } from 'react-redux';

function Home() {
  const [posts, setPosts] = useState([]);
  
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if(userData) service.getPosts(userData.$id).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])

  console.log(posts.length);
  if (posts.length !== 0) {
    return (
      <div className='w-full py-8'>
        <Container>
          <div className='flex flex-wrap'>
            {posts.map((post) => (
              <div key={post.$id} className='p-2 w-1/4'>
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    )
  }
  return (
    <div className="w-full bg-[#040D12] h-screen grid content-center text-center text-[#93B1A6]">
      <div className='flex'>
        <div className='w-2/3'>
          <p class="text-[62px] text-left ml-[3%] font-semibold text-gray-300 drop-shadow-2xl" style={{fontFamily: 'Unbounded'}}>Read, Explore and <br />Gain Knowledge...</p>
          <p class="text-3xl text-left mt-6 ml-[3%] text-gray-400 tracking-wide font-semibold" >Write Your Next Blog...</p>
        </div>
        <div className='w-1/3 mr-[10%] grid content-center mt-[5%]'>
          <img src={home} className=' h-[100%] scale-[1.3]' />
        </div>
      </div>
      <div className='text-left ml-[1%]'>
        <Link
          to="/login"
          className="font-bold text-primary transition-all duration-200 hover:underline"
        >
          <Button className='my-2 mx-4 w-[10%] rounded-3xl bg-[#93B1A6] text-black hover:bg-blue-100  hover:text-black shadow-xl'>Login</Button>
        </Link>
        <Link
          to="/signup"
          className="font-bold text-primary transition-all duration-200 hover:underline"
        >
          <Button className='my-2 mx-4 w-[10%] rounded-3xl bg-[#93B1A6] text-black hover:bg-blue-100  hover:text-black'>Sign Up</Button>
        </Link>
      </div>
    </div>
  )
}

export default Home