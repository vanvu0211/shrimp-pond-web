import { Routes, Route, Navigate} from 'react-router-dom'
import { Fragment } from 'react'
import routes from './routes'

function App() {

  return (
    <Routes>
            {routes.map((route) => {
                const Component = route.component
                // const MainComponentLayout = route.mainLayout ? mainLayout : null
                // const AddComponentLayout = route.addLayout ? addLayout : null
                // const protectedRoute = route.protected

                return (
                    <Fragment key={route.path}>
                        {/* {protectedRoute && !isLogin ? (
                            <Route path="*" element={<Navigate to={paths.login} />} />
                        ) : ( */}
                        <Route
                            path={route.path}
                            element={
                                // MainComponentLayout ? (
                                //     <MainComponentLayout title={route.title}>
                                //         <Component />
                                //     </MainComponentLayout>
                                // ) : AddComponentLayout ? (
                                //     <AddComponentLayout title={route.title}>
                                //         <Component />
                                //     </AddComponentLayout>
                                // ) : (
                                    <Component />
                                // )
                            }
                        />
                        {/* )} */}
                    </Fragment>
                )
            })}
        </Routes>
  )
}

export default App
