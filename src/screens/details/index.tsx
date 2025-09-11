import React, { useEffect, useState } from 'react';
import Header from '../../layout/header';

import './index.less';
import { Col, Modal, Row, Spin, Switch } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import useTeam from '../../hooks/useTeam';
import { getHeroDetail } from '../../service/getHeroes'
import { MessageObject } from "../../model/MessageData.modal";
import HeroModel, { DefaultHeroMode } from '../../model/Hero.model';

const Details = (props: any) => {

  const [heroDetails, setHeroDetails] = useState<HeroModel>(DefaultHeroMode);
  const [loading, setLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<MessageObject>({ error: false, msg: '', desc: '' });
  const { isOnTeam, isMaxReached, isGoodBadMixed, addMemberToTeam, removeMemberFromTeam } = useTeam();

  let { id }: any = useParams();

  useEffect(() => {
    loadDetails();
  }, []);

  async function loadDetails() {
    setLoading(true);
    let heroData: HeroModel = await getHeroDetail(id)
    setHeroDetails(heroData);
    setLoading(false);
  }

  const addHero = () => {
    if (isMaxReached()) {
      setMsg({ error: true, msg: 'Ops! You have too many team members', desc: 'You may only select 8 team members at a time' });
      return
    }
    if (isGoodBadMixed(heroDetails)) {
      setMsg({ error: true, msg: 'Ops! You can create mixed type of super team', desc: 'Team can only contain one type of hero (Good or Bad)' });
      return
    }

    addMemberToTeam(heroDetails);
  }

  const removeHero = () => {
    removeMemberFromTeam(heroDetails)
  }

  return (
    <div className="details-full">
      <Header />
      <div className="hero-container">
        {loading ? (
          <div className="text-center mt-50">
            <Spin />
          </div>
        ) : (
          <Row>
            <Col md={{ span: 11 }} sm={{ span: 24 }}>
              <div className="left-side">
                <img className="full-image" src={`${heroDetails?.image?.url}`} />
                <div className="action-container">
                  <div className="hero-name size-40 white primary">{heroDetails?.name}</div>
                  <div className="card-content-actions flex flex-justify-center mt-20">
                    <div className="action-label mr-10 white">Add to team</div>

                    <div className="action-label">
                      <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        checked={heroDetails ? isOnTeam(heroDetails) : false}
                        onChange={(e) => { e ? addHero() : removeHero() }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            <Col md={{ span: 13 }} sm={{ span: 24 }} className="detail-col">
              <Row gutter={[12, 12]}>
                <Col md={{ span: 10 }} sm={{ span: 24 }}>
                  <div className="black size-20 primary mb-15">Powerstats</div>
                  <Row gutter={[16, 16]}>
                    <Col span={10}>
                      <div className="flex">
                        <div className="details-label">Intelligence: </div>
                        <span>{heroDetails?.powerstats?.intelligence}</span>
                      </div>
                    </Col>

                    <Col span={10}>
                      <div className="flex">
                        <div className="details-label">Durability: </div>
                        <span>{heroDetails?.powerstats?.durability}</span>
                      </div>
                    </Col>

                    <Col span={10}>
                      <div className="flex">
                        <div className="details-label">Strength:</div>
                        <span>{heroDetails?.powerstats?.strength}</span>
                      </div>
                    </Col>

                    <Col span={10}>
                      <div className="flex">
                        <div className="details-label">Power: </div>
                        <span>{heroDetails?.powerstats?.power}</span>
                      </div>
                    </Col>

                    <Col span={10}>
                      <div className="flex">
                        <div className="details-label">Speed: </div>
                        <span>{heroDetails?.powerstats?.speed}</span>
                      </div>
                    </Col>

                    <Col span={10}>
                      <div className="flex">
                        <div className="details-label">Combat: </div>
                        <span>{heroDetails?.powerstats?.combat}</span>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col md={{ span: 14 }} sm={{ span: 24 }}>
                  <div className="black size-20 primary mb-15 mobile-top">Appearance</div>
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <div className="flex">
                        <div className="details-label">Gender: </div>
                        <span>{heroDetails?.appearance?.gender}</span>
                      </div>
                    </Col>

                    <Col span={12}>
                      <div className="flex">
                        <div className="details-label">Weight: </div>
                        <span>{heroDetails?.appearance?.weight?.map((weight: any) => (
                          <div>{weight},</div>
                        ))}</span>
                      </div>
                    </Col>

                    <Col span={12}>
                      <div className="flex">
                        <div className="details-label">Race:</div>
                        <span>{heroDetails?.appearance?.race} </span>
                      </div>
                    </Col>

                    <Col span={12}>
                      <div className="flex">
                        <div className="details-label">Eye Color: </div>
                        <span>{heroDetails?.appearance['eye-color']}</span>
                      </div>
                    </Col>

                    <Col span={10}>
                      <div className="flex">
                        <div className="details-label">Hair Color: </div>
                        <span>{heroDetails?.appearance['hair-color']}</span>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row className="mt-30">
                <div className="black size-20 primary mt-30 mb-15">Biography</div>
                <Col span={24}>
                  <div className="flex mb-10">
                    <div className="details-label">Full Name: </div>
                    <span>{heroDetails?.name}</span>
                  </div>
                  <div className="flex mb-10">
                    <div className="details-label">Alter Egos: </div>
                    <span>{heroDetails?.biography['alter-egos']}</span>
                  </div>
                  <div className="flex mb-10">
                    <div className="details-label">Aliases: </div>
                    <span>
                      {heroDetails?.biography?.aliases?.map((alias: any) => (
                        <>{`"${alias}"`},</>
                      ))}
                    </span>
                  </div>
                  <div className="flex mb-10">
                    <div className="details-label">Place of Birth: </div>
                    <span>{heroDetails?.biography['place-of-birth']}</span>
                  </div>
                  <div className="flex mb-10">
                    <div className="details-label">Alignment: </div>
                    <span>{heroDetails?.biography?.alignment}</span>
                  </div>
                </Col>
              </Row>


              <Row className="mt-30">
                <div className="black size-20 primary mb-15">Work</div>
                <Col span={24}>
                  <div className="flex mb-10">
                    <div className="details-label">Occupation: </div>
                    <span>{heroDetails?.work?.occupation}</span>
                  </div>
                  <div className="flex mb-10">
                    <div className="details-label">Base: : </div>
                    <span>{heroDetails?.work?.base}</span>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </div>
      <Modal centered className="custom-modal" footer={null} title="" visible={msg?.error} onCancel={() => { setMsg({ error: false, msg: '', desc: '' }) }}>
        <div>
          <div className="primary black size-20">{msg?.msg}</div>
          <div className="black size-16 mt-10">{msg?.desc}</div>
        </div>
      </Modal>
    </div>
  );
};

export default Details;
