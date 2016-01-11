module Exchange where

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Effects
import StartApp.Simple as StartApp
import Json.Decode exposing (..)
-- MODEL

type alias Model =
  { leftInput : String
  , rightInput : String
  }


initialModel : Model
initialModel =
  { leftInput = ""
  , rightInput = ""
  }


-- UPDATE

type Action
  = NoOp
  | UpdateLeftInput
  | UpdateRightInput


update : Action -> Model -> Model
update action model =
  case action of
    NoOp ->
      model

    UpdateRightInput ->
      model

    UpdateLeftInput ->
      model




-- PORTS

port lastPrice : Signal String

-- VIEW


-- apiResponse =




view : Signal.Address Action -> Model -> Html
view address model =
  div
    [ id "container" ]
    [ pageHeader
    , pageFooter
    ]


pageHeader : Html
pageHeader =
  h1 [ ] [ text "Convert BTC" ]


pageFooter : Html
pageFooter =
  footer [ ]
    [ a
      [ href "https://www.eitansternlicht.com" ]
      [ text "Created By Eitan Sternlicht" ] ]

val : Decoder String
val =
    at ["ticker", "last"] string

parseLastPrice json =
  case decodeString val json of
    Ok value ->
      value
    Err error ->
      ""

toStringText val =
  text (toString val)

-- port refreshLastPrice : Signal Bool
-- port refreshLastPrice =
-- value : Decoder String
-- value =
--     at List String Json.Decode.Decoder a  string

-- refreshButton =
--   button
--     [  ]
--     [ text "Refresh Last Price"]

main =
  Signal.map text (Signal.map parseLastPrice lastPrice)

-- main: Signal Html
-- main =
--   StartApp.start
--     { model = initialModel,
--       view = view,
--       update = update
--     }
