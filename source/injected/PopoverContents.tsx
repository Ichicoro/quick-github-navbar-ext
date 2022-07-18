import { BookIcon, GearIcon, GitPullRequestIcon, IssueOpenedIcon, PlayIcon } from "@primer/octicons-react"
import React, { h } from "preact"
import { useEffect, useState } from "preact/hooks"
import OptionsSync from "webext-options-sync"

// @ts-ignore
import * as webexttypes from "web-ext-types"

// @ts-ignore
import optionsStorage from "./../options-storage.js"

import "./style.scss"

type ShownType = "issues" | "pulls" | "wiki" | "actions" | "settings"
type RepoData = {
  repo: string,
  shown: {
    url: string,
    type: ShownType,
    text: string
  }[]
}

const iconMap = {
  issues: <IssueOpenedIcon />,
  actions: <PlayIcon />,
  pulls: <GitPullRequestIcon />,
  settings: <GearIcon />,
  wiki: <BookIcon />
} as { [key in ShownType]: JSX.Element }

const openUrl = async(url: string, newTab: boolean = false) => {
  // @ts-ignore
  const brr: typeof window.browser = typeof browser == "undefined" ? chrome : browser

  const current = (await brr.tabs.query({ active: true, currentWindow: true }))?.[0]

  if (newTab) {
    await brr.tabs.create({
      url,
      active: true,
      index: current.index + 1
    })
  } else {
    await brr.tabs.update(current.id, { url })
  }
}

const PopoverContents: React.FunctionComponent = () => {
  const [repoData, setRepoData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    void (async() => {
      const data = await (optionsStorage as OptionsSync<any>).getAll()
      console.log(data)
      if (data.repoData) {
        setRepoData(data.repoData)
        setIsLoading(false)
      }
    })()
  }, [])

  const data = [
    {
      repo: "soluzionifutura/minosse-frontend",
      shown: [
        { url: "/issues/assigned/Ichicoro", type: "issues", text: "Assigned" },
        { url: "/pulls", type: "pulls", text: "Pulls" }
      ]
    },
    {
      repo: "soluzionifutura/minosse-api",
      shown: [
        { url: "/issues/assigned/Ichicoro", type: "issues", text: "My issues :)" },
        { url: "/pulls", type: "pulls", text: "Pulls?" },
        { url: "/actions", type: "actions", text: "Actions" },
        { url: "/settings", type: "settings", text: "Settings" }
      ]
    }
  ] as RepoData[]

  if (isLoading) {
    return <div></div>
    // return <div className="m-3 d-flex justify-content-center align-items-center" style={{ width: 375, maxHeight: 450, padding: ".5rem" }}></div>
  }

  return <div className="qgnpopover__content">
    {data.map((repo, i, arr) => {
      return <div>
        <div style={{ padding: "0 .25rem" }}>
          <a onClick={(e) => openUrl(`https://github.com/${repo.repo}`, e.metaKey)}>
            <code>{repo.repo}</code>
          </a>
        </div>
        <div className="mt-1 qgnpopover__button-row">
          {repo.shown.map(shown => {
            return <span>
              <button className="qgnbutton" onClick={async(e) => {
                await openUrl(`https://github.com/${repo.repo}${shown.url}`, e.metaKey)
              }}>
              {iconMap[shown.type]}&nbsp;{shown.text}
            </button>
            </span>
          })}
        </div>
      </div>
    })}
  </div>
}

export default PopoverContents
