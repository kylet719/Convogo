import React from 'react'

const Login = () => {
  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Welcome to Convogo!</h1>
          <div className="group relative flex w-full justify-center" id="signInDiv">Google button</div>
        </div>
      </div>

      <footer className="p-4 bg-white rounded-lg  md:px-6 md:py-8 absolute inset-x-0 bottom-0 ">
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-400 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a class="hover:underline">Convogo™</a>
        </span>
      </footer>
    </>
        
  )
}

export default Login