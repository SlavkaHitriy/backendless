import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

let url = '/tabs.json'

// Hardcoded fix for github pages
if (window.location.href.includes('github.io')) {
    url = '/backendless/tabs.json'
}

export const Tabs = () => {
    const [tabsData, setTabsData] = useState([])

    const loadTabsData = async () => {
        try {
            const response = await fetch(url)
            const data = await response.json()

            setTabsData(data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        loadTabsData()
    }, [])

    return (<>
        <div style={{
            display: 'flex',
            gap: '24px',
            padding: '24px',
        }}>
            {tabsData.map((tab) => (
                <NavLink style={{
                    textDecoration: 'none',
                    color: '#000',
                }} key={tab.id} to={tab.id}>
                    {({ isActive}) => (
                        <div style={{
                            padding: '12px 24px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: isActive ? 'bold' : 'normal',
                        }}>
                            {tab.title}
                        </div>
                    )}
                </NavLink>
            ))}
        </div>
    </>)
}
