import React from "react"
import styled from "styled-components/macro"

import { COLORS, WEIGHTS } from "../../constants"
import { formatPrice, pluralize, isNewShoe } from "../../utils"
import Spacer from "../Spacer"

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        {variant !== "default" && (
          <VariantTag variant={variant}>
            {variant === "on-sale" ? "Sale" : "Just Released!"}
          </VariantTag>
        )}
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price onSale={!!salePrice}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {variant === "on-sale" && (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          )}
        </Row>
      </Wrapper>
    </Link>
  )
}

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 1 350px;
`

const Wrapper = styled.article`
  position: relative;
`

const ImageWrapper = styled.div`
  position: relative;
  border-radius: 16px 16px 4px 4px;
  overflow: hidden;
`

const Image = styled.img`
  width: 100%;
`

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`

const Price = styled.span`
  text-decoration: ${(p) => p.onSale && "line-through"};
  color: ${(p) => p.onSale && COLORS.gray[700]};
`

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`

const VariantTag = styled.span`
  position: absolute;
  top: 12px;
  right: -4px;
  padding: 8px 12px;
  border-radius: 2px;
  color: ${COLORS.white};
  font-weight: 600;
  font-size: 0.875rem;
  background-color: ${(p) =>
    p.variant === "on-sale" ? COLORS.primary : COLORS.secondary};
`

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`

export default ShoeCard
