import React from "react"
import clsx from "clsx"
import { useRouter } from "next/router"
import NextLink from "next/link"
import MuiLink from "@mui/material/Link"
import { styled } from "@mui/material/styles"

const Anchor = styled("a")({})

export const NextLinkComposed = React.forwardRef<any, any>(
    function NextLinkComposed(props, ref) {
        const { to, linkAs, replace, scroll, shallow, prefetch, locale, ...other } = props

        return (
            <NextLink
                href={to}
                prefetch={prefetch}
                as={linkAs}
                replace={replace}
                scroll={scroll}
                shallow={shallow}
                passHref
                locale={locale}
            >
                <Anchor ref={ref} {...other} />
            </NextLink>
        )
    }
)

// https://nextjs.org/docs/api-reference/next/link
const Link = React.forwardRef<any, any>(
    function Link(props, ref) {
        const {
            activeClassName = "active",
            as,
            className: classNameProps,
            href,
            linkAs: linkAsProp,
            locale,
            noLinkStyle,
            prefetch,
            replace,
            role, // Link don't have roles.
            scroll,
            shallow,
            ...other
        } = props

        const router = useRouter()
        const pathname = typeof href === "string" ? href : href.pathname
        const className = clsx(classNameProps, {
            [activeClassName]: router.pathname === pathname && activeClassName,
        })

        const isExternal =
            typeof href === "string" && (href.indexOf("http") === 0 || href.indexOf("mailto:") === 0)

        if (isExternal) {
            if (noLinkStyle) {
                return <Anchor className={className} href={href} ref={ref} {...other} />
            }

            return <MuiLink className={className} href={href} ref={ref} {...other} />
        }

        const linkAs = linkAsProp || as
        const nextjsProps = { to: href, linkAs, replace, scroll, shallow, prefetch, locale }

        if (noLinkStyle) {
            return <NextLinkComposed className={className} ref={ref} {...nextjsProps} {...other} />
        }

        return (
            <MuiLink
                component={NextLinkComposed}
                className={className}
                ref={ref}
                {...nextjsProps}
                {...other}
            />
        )
    }
)

export default Link
