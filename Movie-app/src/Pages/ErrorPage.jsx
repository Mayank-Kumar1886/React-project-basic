import React from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
    const navigate = useNavigate()

  return (
    <section>
      <div>
        <figure>mvvhj  
          <img 
            src="https://cdn.dribbble.com/users/722246/screenshots/3066818/404-page.gif"
            alt="404 page"
          />
        </figure>
        <div>
          <p>
            The page you were looking for could not be found
          </p>
        </div>
      </div>
      <button className="btn" onClick={()=> navigate(-1)}>Go to Home Page</button>
    </section>
  )
}

export default ErrorPage