import React from 'react'
import { useSelector } from 'react-redux'
import {Container,Logo,LogoutBtn} from '../index'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom' //navigate or link(to="/about") do the same thing

  

function Header() {
  const authStatus = useSelector((state)=> state.auth.status)
  const navigate = useNavigate() // now,if someone write btn onclick=navigate('/about),then it will open that page/element(using react-router-dom)

  const navItems =[
  {
      name:'Home',
      slug:'/', // instead of slug, we can write anything i.e-url:'/' orr link:'/'
      active:true
  },
  {
      name:'Login',
      slug:'/Login', 
      active:!authStatus
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
]

return (
   <Header classname="bg-gray-500 py-3">
     <Container>
       <nav className='flex' >
        <div className='mr-4'>
          <Link to='/'>
              <Logo width='70px'  /> 
          </Link>
        </div>
        <ul className='flex ml-auto'>
          {navItems.map((item)=>{
            item.active?(
              <li key={item.name}>
                <button
                className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                 onClick={()=> navigate(item.slug)}
                > {item.name}</button>
              </li>
            ):null
          })}
        {authStatus && (
          <li>
            <LogoutBtn/>
          </li>
        )}
        </ul>
       </nav>
     </Container>

   </Header>

  )
}

export default Header