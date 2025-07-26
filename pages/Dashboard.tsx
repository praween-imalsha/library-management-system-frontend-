
import { Link } from "react-router-dom"

const Dashboard = () => {
  return (
      <div className='min-h-screen bg-gradient-to-br from-amber-50 via-rose-100 to-indigo-100 py-10 px-4 sm:px-8'>
        <div className='max-w-6xl mx-auto'>
          {/* Page Header */}
          <div className='mb-8 text-center'>
            <h1 className='text-4xl font-bold text-indigo-800 mb-2'>📖 Library Dashboard</h1>
            <p className='text-gray-600 text-lg'>Manage your books, readers, lending records, and more!</p>
          </div>

          {/* Dashboard Cards */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {/* Manage Books */}
            <Link to='/dashboard/books' className='bg-white shadow-md hover:shadow-lg transition rounded-xl p-6 border border-indigo-200'>
              <h2 className='text-xl font-semibold text-indigo-700 mb-2'>📚 Books</h2>
              <p className='text-gray-600'>View, add, or update books in the library collection.</p>
            </Link>

            {/* Manage Readers */}
            <Link to='/dashboard/readers' className='bg-white shadow-md hover:shadow-lg transition rounded-xl p-6 border border-teal-200'>
              <h2 className='text-xl font-semibold text-teal-700 mb-2'>👥 Readers</h2>
              <p className='text-gray-600'>Manage library members and their profiles.</p>
            </Link>

            {/* Lending Records */}
            <Link to='/lending-records' className='bg-white shadow-md hover:shadow-lg transition rounded-xl p-6 border border-rose-200'>
              <h2 className='text-xl font-semibold text-rose-700 mb-2'>📅 Lending</h2>
              <p className='text-gray-600'>Track issued books and return deadlines.</p>
            </Link>

            {/* Overdue Books */}
            <Link to='/overdue' className='bg-white shadow-md hover:shadow-lg transition rounded-xl p-6 border border-yellow-300'>
              <h2 className='text-xl font-semibold text-yellow-600 mb-2'>⏰ Overdue</h2>
              <p className='text-gray-600'>Monitor overdue books and notify readers.</p>
            </Link>

            {/* Notifications */}
            <Link to='/notifications' className='bg-white shadow-md hover:shadow-lg transition rounded-xl p-6 border border-purple-200'>
              <h2 className='text-xl font-semibold text-purple-700 mb-2'>🔔 Notifications</h2>
              <p className='text-gray-600'>Send email reminders to readers.</p>
            </Link>

            {/* Audit Logs */}
            <Link to='/audit-logs' className='bg-white shadow-md hover:shadow-lg transition rounded-xl p-6 border border-gray-300'>
              <h2 className='text-xl font-semibold text-gray-800 mb-2'>📝 Logs</h2>
              <p className='text-gray-600'>View actions history for transparency and tracking.</p>
            </Link>
          </div>
        </div>
      </div>
  )
}

export default Dashboard
